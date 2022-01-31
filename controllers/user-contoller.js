const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const {validationResult} = require('express-validator')


const User = require('../models/user-model');

exports.register = async(req, res) => {
    console.log(req.body)

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 'fail',
                errors: errors.array(),
                message: `некорректные данные`,
            })
        }

        console.log(req.body)

        const {email, password} = req.body;
        const candidate = await User.findOne({email});
        if (candidate) {
            return res.status(400).json({
                status: 'fail',
                message: `${email} уже зарегистрирован`,
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({email, password: hashedPassword});

        res.status(201).json({
            status: 'success',
            message: `создан пользователь с email ${email}`,
            data: {user},
        })

    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: 'что-то не так!',
        })
    }
}

exports.login = async(req, res) => {
    try {
        console.log(req.body)

        const errors = validationResult(req);
        // console.log('errors', errors.isEmpty())

        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 'fail',
                errors: errors.array(),
                message: `некорректные данные`,
            })
        }

        const {email, password} = req.body;
        const user = await User.findOne({email});

        const isPasswordCorrect = user ? await bcrypt.compare(password, user.password) : false;

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({
                status: 'fail',
                message: 'неверный email или пароль',
            })
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwt-secret'),
            {expiresIn: '1h'},
        )

        res.json({
            status: 'success',
            message: `user ${email} login`,
            token,
            userId: user.id})

    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: 'что-то не так!',
        })
    }
}