const JSONAPISerializer = require('jsonapi-serializer').Serializer;
const JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
const JSONAPIError = require('jsonapi-serializer').Error;
const I = require('i')();

const DB = require ('../models')


class Controller {

    constructor (model, serializer) {
        this._model = model
        this._type = model.name
        this.optsGenerator = require('./serializers/'+ model.name)
        //['findAll', 'getQuery', 'generateIncludeStatement', 'getById'].forEach(methodName => {  // This doesn't work for some reason, why?
            new Array('findAll', 'handleQuery', 'generateIncludeStatement',
                'handleQueryById', 'handleUpdateById', 'handleCreate', 'handleDeleteById',
              'serialize', 'deserialize').forEach(methodName => {
            this[methodName] = this[methodName].bind(this)
        });
    }

    serialize (payload, includeModelNames) {
      const serializer = new JSONAPISerializer(this._type, this.optsGenerator(includeModelNames, 'serialize'))
      return serializer.serialize(payload)
    }

    async deserialize (payload) {
      const deserializer = new JSONAPIDeserializer(this.optsGenerator(null, 'deserialize'))
      try {
        const obj = await deserializer.deserialize(payload)

        Object.keys(obj).forEach(key => {
          if (typeof obj[key] === 'object' && !Array.isArray(obj[key]) && obj[key] !== null) {
            obj[key + 'Id'] = obj[key].id
          }
        })

        return obj
      } catch (err) {
        this.handleError(err)
      }
    }

    // This method is responsible for querying db using suitable conditions
    findAll (req, res, next) {
        return this._model.findAndCountAll({
            where: this.generateWhereClause(req),
            include: this.generateIncludeStatement(req),
            order: this.generateSortingCondition(req),
            limit: this.generateLimitStatement(req),
            offset: this.generateOffsetStatement(req)
        })
    }

    findById (req, res, next) {
        return this._model.findById(req.params.id, {
            include: this.generateIncludeStatement(req),
            order: this.generateSortingCondition(req)
        })
    }

    // contruct a where clause based on req.query.filter Object
    generateWhereClause (req) {
        return req.query.filter || undefined
    }

    // construct a Sorting Condition(value for sequelize sort: key) based on req.query.sort
    generateSortingCondition (req) {
        if (!req.query.sort) 
            return []
    
        const sortArray = req.query.sort.split(',')
        return sortArray.map(prop => prop.charAt(0)== '-' ? [prop.substring(1), 'DESC'] : [prop, 'ASC'] )
    }

    // construct a include Condition(value for sequelize include:key) base on req.query.include
    generateIncludeStatement (req) {
        // get all modelNames listed in req.query.include
        const includedModels = this.getIncludeModelNames (req)
        return Object.keys(this._model.associations).map (modelName => {
            const includeObj = {
                model: DB[I.pluralize(modelName)], // since we use singular modelNames
            }

            if ( includedModels.includes(modelName) && !['users'].includes(modelName)) // make a nested include if users requested this resource
                return ({
                    ...includeObj,
                    include: {
                        all: true,
                    }
                })
            else {
                return includeObj // else return just include this one.
            }
            
        })
    }

    // parse req.query.include for model names. 
    // We only support single level includes as of now
    getIncludeModelNames (req) {
        if (!req || !req.query.include)
            return []
        const includedModels = req.query.include.split(',')
        return includedModels
    }

    generateOffsetStatement (req) {
        const page = req.query.page || {}
        return +page.offset || 0
    }

    generateLimitStatement (req) {
        const page = req.query.page || {}
        return +page.limit || 20
    }

    // Handles Error Responses
    handleError(err, res) {
      console.error(err)
      if (res) {
        res.status(500).json(new JSONAPIError({
            code: err.name === 'SequelizeDatabaseError' ? 400: 500,
            title: err.name,
            detail: err.message
        }))
      }
    }

    // Handles GET: /:resource/
    handleQuery(req, res, next) {
        this.findAll(...arguments).then ( ({rows, count}) => {
            const includeModelNames = this.getIncludeModelNames(req)
            const limit = this.generateLimitStatement(req)
            const offset = this.generateOffsetStatement(req)
            rows = rows.map( _ => _.get({plain: true}))
            rows.pagination = {
                count,
                currentOffset: offset,
                nextOffset: offset + limit < count ? offset + limit : count,
                prevOffset: offset - limit > 0 ? offset - limit : 0,
            }
            res.json(this.serialize(rows, includeModelNames))
        }).catch (err => this.handleError(err, res))
    }

    // Handles GET: /:resource/:id
    handleQueryById(req, res, next) {
        this.findById(...arguments).then( data => {
            const includeModelNames = this.getIncludeModelNames(req)
            data = data.get({plain: true})
            res.json(this.serialize(data, includeModelNames))
        }).catch (err => this.handleError(err, res))
    }

    //Handles POST /:resource/
    async handleCreate(req, res, next) {
      try {
        const modelObj = await this.deserialize(req.body)

        // set createdBy Id
        modelObj.createdById = req.user.id

        const dbObj = await this._model.create(modelObj)
        const result = await this._model.findById(dbObj.id, {
          include: this.generateIncludeStatement()
        })
        res.json(this.serialize(result))

        return result
      } catch (err) {
        this.handleError(err, res)
      }
    }

    //Handles PATCH: /:resource/:id
    async handleUpdateById(req, res, next) {
      try {  
        const modelObj = await this.deserialize(req.body)

        // set updatedBy
        modelObj.updatedById = req.user.id

        await this._model.update(modelObj, {
          where: {
            id: req.params.id
          }
        })
        const result = await this._model.findById(req.params.id, {
          include: this.generateIncludeStatement()
        })
        res.json(this.serialize(result))
      } catch (err) {
        this.handleError(err, res)
      }
    }

    //Handles DELETE: /:resource/:id
    handleDeleteById(req, res, next) {
        const resourceId = req.params.id
        this._model.destroy({
            where: {
                id: resourceId
            }
        })
        .then(res.sendStatus(204))
        .catch(err => this.handleError(err, res))
    }

}

module.exports = Controller
