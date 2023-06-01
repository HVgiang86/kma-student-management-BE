var jwt = require('jsonwebtoken');
var User = require('../models/user');
var secretKey = process.env.JWT_SECRET || 'kmaGiangSecretKey';

//var options = { expiresIn: '1d' };
var options = {};

authMiddleware = {
    genToken: (userid, email) => {
        const token = jwt.sign({ uid: userid, email: email }, secretKey, options);
        console.log(`payload: ${JSON.stringify({ uid: userid, email: email }, null, 4)}`);
        return token;
    },
    isAuth: async (req, res, next) => {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                token = req.headers.authorization.split(' ')[1];
                const decoded = jwt.verify(token, secretKey);

                const uid = decoded.uid;
                const email = decoded.email;

                const result = await User.findOne({ where: { uid: uid, email: email } })
                if (!result) {
                    msg = { msg: "Unauthorized, token failed" }
                    res.status(401).send(JSON.stringify(msg, null, 4));
                } else {
                    req.user = result;
                    next();
                }
            } catch (err) {
                console.log('An error occurred:', err);
                msg = { msg: "Internal server error" }
                res.status(500).send(JSON.stringify(msg, null, 4));
            }
        } else {
            msg = { msg: "Unauthorized, no token" }
            res.status(401).send(JSON.stringify(msg, null, 4));
        }
    }
}

module.exports = authMiddleware;