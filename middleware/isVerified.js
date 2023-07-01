const jwt = require('jsonwebtoken');

exports.isVerified = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
    } catch (error) {
        return res.status(401).json({ message: 'You are not authenticated!'});
    }

    return next();
}
