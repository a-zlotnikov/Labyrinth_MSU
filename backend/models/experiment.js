const mongoose = require('mongoose');
const {environmentSchema} = require('./environment');

const experimentSchema = new mongoose.Schema({
  envName: String,
  env: environmentSchema,
  expName: String,
  individual: String,
  expNumber: Number
});

module.exports = {
  experimentSchema,
  Experiment: mongoose.model('Experiment', experimentSchema)
};
