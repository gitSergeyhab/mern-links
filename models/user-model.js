const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    email: {
        type: String,
        required: [true, 'емейл обязателен'],
        unique: [true, 'такой емэйл уже зарегистрирован'],
    },
    password: {
        type: String,
        required: [true, 'пароль обязателен'],
    },
    links: [{type: Types.ObjectId, ref: 'Link'}],
})

module.exports = model('User', schema)