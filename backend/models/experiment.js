const mongoose = require('mongoose');
const {environmentSchema} = require('./environment');

const experimentSchema = new mongoose.Schema({
  user: {type: mongoose.Types.ObjectId, ref: "User"},
  envName: String,
  env: environmentSchema,
  expName: String,
  animal: String,
  expNumber: Number,
  moves: Array
});

module.exports = {
  experimentSchema,
  Experiment: mongoose.model('Experiment', experimentSchema)
};
