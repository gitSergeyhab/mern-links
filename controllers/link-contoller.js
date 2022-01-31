const config = require('config');
const shortid = require('shortid');
const Link = require('../models/link-model');

exports.generateLink = async(req, res) => {

    try {
        const baseUrl = config.get('baseUrl');
        const {from} = req.body;
        const exist = await Link.findOne({ from });

        if (exist) {
            console.log(exist)
            return res.json({
                link: exist,
                message: `link with  ${from}  ->  ${exist.to}  is already exist`,
            })
        }

        const code = shortid.generate();

        const to = `${baseUrl}/to/${code}`;


        const link = await Link.create({ code, from, to, owner: req.user.userId });

        res.status(201).json({
            link,
            message: `created new link  ${from}  ->  ${to}`,
        })

    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: 'что-то не так!',
        })
    }
}

exports.getLinks = async(req, res) => {
    try {

        const links = await Link.find({ owner: req.user.userId })
        res.json({
            status: 'success',
            message: 'all links',
            data: {links}
        })

    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: 'что-то не так!',
        })
    }
}

exports.getLinkById = async(req, res) => {
    try {

        const {id} = req.params;
        console.log('id', id)

        const link = await Link.findById(id)

        if (!link) {
            return res.status(400).json({
                status: 'fail',
                message: `there is not with id ${id}`,
            })
        }

        res.json({
            status: 'success',
            message: `link with ${id}`,
            link,
        })

    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: 'что-то не так!',
        })
    }
}