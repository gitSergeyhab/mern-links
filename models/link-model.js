const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  from: {
    type: String,
    required: [true, 'from обязателен'],
  },
  to: {
    type: String,
    required: [true, 'to обязателен'],
    unique: [true, 'такой to уже зарегистрирован'],
  },
  code: {
    type: String,
    required: [true, 'code обязателен'],
    unique: [true, 'такой code уже зарегистрирован'],
  },
  date: { type: Date, default: Date.now },
  click: { type: Number, default: 0 },
  owner: { type: Types.ObjectId, ref: 'User' },
});

module.exports = model('Link', schema);
