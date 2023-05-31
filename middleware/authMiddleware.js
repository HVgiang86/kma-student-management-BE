var jwt = require('jsonwebtoken');
var secretKey = process.env.JWT_SECRET || 'kmaGiangSecretKey';

var options = { expiresIn: '1d' };

authMiddleware = {
    genToken: (userid, email) => {
        const token = jwt.sign({ userid: userid, email: email }, secretKey, options);
        return token;
    },
    protect: async (req, res, next) => {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                token = req.headers.authorization.split(' ')[1];
                const decoded = jwt.verify(token, secretKey);
    
                console.log(`${decoded} Value of req.user is ${req.user}`);
                next();
            } catch (err) {
                console.log(err);
            }
        }
    }
}