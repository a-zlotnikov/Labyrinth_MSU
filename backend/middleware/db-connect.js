const mongoose = require('mongoose');

// Данное поле будет заменено на актуальный сервер при его создании
mongoose.connect('mongodb+srv://admin:LnCC67f8@labirynth-420rj.mongodb.net',
    {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = mongoose.connection;
