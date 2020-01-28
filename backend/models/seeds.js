const mongoose = require('mongoose');
const {Field} = require('./field');

mongoose.connect('mongodb+srv://admin:LnCC67f8@labirynth-420rj.mongodb.net',
    {useNewUrlParser: true}).then(() => {
  Field.insertMany(
    {line: [
          {
            line: [
              {index: 'a1', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'b1', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'c1', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'd1', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'e1', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'f1', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'g1', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'h1', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'i1', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'j1', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'k1', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false}],
          },
          {
            line: [
              {index: 'a2', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'b2', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'c2', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'd2', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'e2', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'f2', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'g2', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'h2', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'i2', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'j2', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'k2', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false}],
          },
          {
            line: [
              {index: 'a3', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'b3', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'c3', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'd3', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'e3', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'f3', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'g3', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'h3', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'i3', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'j3', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'k3', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false}],
          },
          {
            line: [
              {index: 'a4', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'b4', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'c4', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'd4', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'e4', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'f4', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'g4', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'h4', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'i4', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'j4', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'k4', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false}],
          },
          {
            line: [
              {index: 'a5', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'b5', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'c5', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'd5', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'e5', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'f5', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'g5', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'h5', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'i5', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'j5', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'k5', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false}],
          },
          {
            line: [
              {index: 'a6', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'b6', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'c6', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'd6', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'e6', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'f6', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'g6', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'h6', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'i6', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'j6', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'k6', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false}],
          },
          {
            line: [
              {index: 'a7', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'b7', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'c7', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'd7', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'e7', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'f7', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'g7', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'h7', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'i7', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'j7', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'k7', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false}],
          },
          {
            line: [
              {index: 'a8', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'b8', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'c8', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'd8', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'e8', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'f8', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'g8', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'h8', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'i8', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'j8', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'k8', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false}],
          },
          {
            line: [
              {index: 'a9', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'b9', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'c9', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'd9', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'e9', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'f9', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'g9', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'h9', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'i9', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'j9', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'k9', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false}],
          },
          {
            line: [
              {index: 'a10', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'b10', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'c10', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'd10', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'e10', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'f10', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'g10', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'h10', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'i10', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'j10', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'k10', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false}],
          },
          {
            line: [
              {index: 'a11', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'b11', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'c11', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'd11', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'e11', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'f11', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'g11', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'h11', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'i11', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'j11', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false},
              {index: 'k11', wall: false, food: false, fakeFood: false, entry: false, exit: false, pedal: false, value: null, start: false}],
          }
        ]}
      );
});
