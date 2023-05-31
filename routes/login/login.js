var express = require('express');
var router = express.Router();
const controller = require('../../controllers/login');
var auth = require('../../middleware/authMiddleware')


router.post('/', async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const result = await controller.login(email, password)

        if (result === null) {
            msg = { msg: "Unauthorized" }
            res.status(401).send(JSON.stringify(msg, null, 4));
        } else {
            msg = {
                msg: "Authorized",
                token: auth.genToken(result.uid, result.email,)
            }
            res.status(200).send(JSON.stringify(result, null, 4));
        }
    } catch (err) {
        console.log('An error occurred:', err);
        msg = { msg: "Internal server error" }
        res.status(500).send(JSON.stringify(msg, null, 4));
    }

});

module.exports = router;