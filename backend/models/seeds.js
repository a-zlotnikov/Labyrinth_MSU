const mongoose = require('mongoose');
const {Field} = require('./field');

mongoose.connect('mongodb+srv://admin:LnCC67f8@labirynth-420rj.mongodb.net',
    {useNewUrlParser: true}).then(() => {
  Field.insertMany([
    {
      line: [{value: 'a1', wall: false, food: false, start: false},
       {value: 'b1', wall: false, food: false, start: false},
      {value: 'c1', wall: false, food: false, start: false}]
    },
    {
      line: [{value: 'a2', wall: false, food: false, start: false},
        {value: 'b2', wall: false, food: false, start: false},
        {value: 'c2', wall: false, food: false, start: false}]
    },
    {
      line: [{value: 'a3', wall: false, food: false, start: false},
        {value: 'b3', wall: false, food: false, start: false},
        {value: 'c3', wall: false, food: false, start: false}]
    },
    {
      line: [{value: 'a4', wall: false, food: false, start: false},
        {value: 'b4', wall: false, food: false, start: false},
        {value: 'c4', wall: false, food: false, start: false}]
    },
    {
      line: [{value: 'a5', wall: false, food: false, start: false},
        {value: 'b5', wall: false, food: false, start: false},
        {value: 'c5', wall: false, food: false, start: false}]
    }
    ]);
});
