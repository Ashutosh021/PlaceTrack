const jwt = require('jsonwebtoken');
require('dotenv').config()

const isLoggedIn = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect("/register");
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data;
        next();
    } catch (err) {
        console.error('Error verifying token:', err);
        return res.redirect("/register");
    }
}

module.exports = isLoggedIn;




