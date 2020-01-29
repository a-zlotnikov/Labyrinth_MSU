const db = require('mongoose');

const typeSchema = new db.Schema({
  name: {type: String, required: true, unique: true, min: 3, max: 3, match: /^[A-Z]{3}$/
    // validate: {
    //   validator: function(v) {
    //     return /^[A-Z]{3}$/.test(v);
    //   },
    //   message: props => `${props.value} is not a valid name!!!`
    // },
  },
  description: String,
});

const Type = db.model('Type', typeSchema);

module.exports = Type;
