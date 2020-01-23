const db = require('mongoose');

const userSchema = new db.Schema({
  username: {type: String, required: true, unique: true}, // Идентификатор пользователя, по которому будет происходит авторизация
  password: {type: String, required: true},
  category: {type: String, required: true}, // Категория пользователя ('Преподаватель', 'Дипломник', 'Студент')
  surname: {type: String, required: true},
  name: {type: String, required: true},
  gender: {type: String, required: true},
  dob: {type: Date, required: true}, // Дата рождения
  hand: {type: String, required: true}, // 'Левша'/'Правша'
  group: String, // Группа (для студента)
  year: Number,

});

const User = db.model('User', userSchema);

module.exports = User;
