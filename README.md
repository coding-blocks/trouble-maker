# trouble-maker

This README outlines the details of collaborating on this Ember application.
This is the backend application to **trouble-maker-frontend**

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/)
* [Yarn](https://yarnpkg.com/)
* [PostgreSQL](https://www.postgresql.org/docs/10/static/index.html)

## Installation

* `git clone https://github.com/coding-blocks/trouble-maker` 
* `cd trouble-maker`
* `yarn install`

## Setup For Development Environment

* `yarn run sq db:create` To create a postgres user with the name 'troublemaker' and a database with the same name, as mentioned in `config/config.js`.     
* run `node index.js` ( for sync db ) and open new tab to run bellow command
* `yarn run sq db:seed:all` to run all the seed files. You now have a dummy user in your database

## Further Reading / Useful Links

* To setup a user role and a database in postgres, refer to [this article](https://medium.com/coding-blocks/creating-user-database-and-adding-access-on-postgresql-8bfcd2f4a91e)
* To populate your database and run seed files, refer to [this article](http://docs.sequelizejs.com/manual/tutorial/migrations.html)
