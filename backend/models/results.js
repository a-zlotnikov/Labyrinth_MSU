const db = require('mongoose');

const resultsSchema = new db.Schema({
  data: String,
  time: String,
  nameEnvironment: String,
  nameExperiment: String,
  numberExperiment: Number,
  nameIndividual: String,
  surname:String,
  name: String,
  gender: String,
  hand: String,
  year: Number,
  group: String,
  numberOfReinforcements: Number,
  result: Object
  
});

const Results = db.model('Results', resultsSchema);

module.exports = Results;
