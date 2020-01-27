// Подключаем mongoose.
const faker = require('faker');
faker.locale = "ru";
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:LnCC67f8@labirynth-420rj.mongodb.net',
  {useNewUrlParser: true, useUnifiedTopology: true});

const Results = require('./results');

async function seedRes() {
  const newRes = new Results(
    {
      data: '12.12.2020',
      time: '11:02:22',
      nameEnvironment: 'Клетка3х3',
      nameExperiment: '3x3',
      numberExperiment: 4,
      nameIndividual: 'МикиМаус1',
      typeExperiment:'mcx',
      username: '102019BX',
      surname: faker.name.firstName(),
      name: faker.name.lastName(),
      age: 12,
      gender: 'Мужской',
      hand: 'Левша',
      year: 2020,
      group: '101',
      numberOfReinforcements: 3,
      result: [
        {'4': 'l'},
        {'5': 'w'},
        {'7': 'w'},
        {'9': 'e'},
        {'15': 'r'},
      ],
    },
  );
  await newRes.save();
}

seedRes().then(() => {
  mongoose.connection.close();
});