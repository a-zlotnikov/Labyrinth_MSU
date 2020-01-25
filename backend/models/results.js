const db = require('mongoose');

const resultsSchema = new db.Schema({
  data: String,
  time: String,
  nameEnvironment: String,
  nameExperiment: String,
  numberExperiment: Number,
  nameIndividual: String,
  // user: {type: mongoose.Types.ObjectId, ref: 'User'},
  //---------------------------
  surname: String,
  name: String,
  age: Number,
  gender: String,
  hand: String,
  year: Number,
  group: String,
  //---------------------------
  numberOfReinforcements: Number,
  result: Array,
  
});

const Results = db.model('Results', resultsSchema);

module.exports = Results;
