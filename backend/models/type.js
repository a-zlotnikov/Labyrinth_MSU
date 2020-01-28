const db = require('mongoose');

const typeSchema = new db.Schema({
  name: {type: String, required: true, unique: true, min: 3, max: 3, match: /^([A-Z]*)$/g},
  description: String,
});

const Type = db.model('Type', typeSchema);

module.exports = Type;
