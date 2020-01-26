const mongoose = require('mongoose');
const {fieldSchema} = require('./field');

const environmentSchema = new mongoose.Schema({
  name: String,
  field: fieldSchema
});

module.exports = {
  environmentSchema,
  Environment: mongoose.model('Environment', environmentSchema)
};
