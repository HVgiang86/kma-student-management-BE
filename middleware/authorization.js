
authorizationMiddleware = {
    isAdminOnly: async (req, res, next) => {
        try {
            const user = req.user;

            if (user.role_name !== 'admin') {
                msg = { msg: "Unauthorized. Forbidden. Admin required" }
                res.status(403).send(JSON.stringify(msg, null, 4));
            } else {
                next();
            }
        } catch (err) {
            console.log('An error occurred:', err);
            msg = { msg: "Internal server error" }
            res.status(500).send(JSON.stringify(msg, null, 4));
        }
    },
    allAccess: async (req, res, next) => {
        try {
            const user = req.user;

            if (user.role_name !== 'admin' && user.role_name !== 'student') {
                msg = { msg: "Unauthorized. Forbidden. Valid role required" }
                res.status(403).send(JSON.stringify(msg, null, 4));
            } else {
                next();
            }
        } catch (err) {
            console.log('An error occurred:', err);
            msg = { msg: "Internal server error" }
            res.status(500).send(JSON.stringify(msg, null, 4));
        }
    },

};

module.exports = authorizationMiddleware;