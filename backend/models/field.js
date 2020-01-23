const mongoose = require('mongoose');

const fieldSchema = new mongoose.Schema({
    line: Array
});

module.exports = {
    fieldSchema,
    Field: mongoose.model('Field', fieldSchema)
};
