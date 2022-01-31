const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    console.log(req.headers.authorization)

    try {
        const token = req.headers.authorization.split(' ')[1];;
        console.log(token)
        if (!token) {
            return res.status(401).json({message: 'no authorization', status: 'fail'})
        }

        const decoded = jwt.verify(token, config.get('jwt-secret'));
        console.log(decoded)
        req.user = decoded;
        next();

    } catch {
        res.status(401).json({message: 'no authorization', status: 'fail'})
    }
}