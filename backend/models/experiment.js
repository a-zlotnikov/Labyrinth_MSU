const mongoose = require('mongoose');
const {environmentSchema} = require('./environment');

const experimentSchema = new mongoose.Schema({
  date: String,
  time: String,
  user: {type: mongoose.Types.ObjectId, ref: "User"},
  env: environmentSchema,
  expName: String,
  animalName: String,
  expNumber: Number,
  expType: String,
  moves: Array
});

module.exports = {
  experimentSchema,
  Experiment: mongoose.model('Experiment', experimentSchema)
};
