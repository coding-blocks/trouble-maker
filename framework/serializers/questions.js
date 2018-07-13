module.exports = function (included, type, config) {
  if (typeof type === 'object') {
    config = type
  }

  const options = {
    attributes: ['title'],
    meta: {
      pagination: function (record) {
        return record.pagination
      }
    },
    ...config
  }

  return options
}