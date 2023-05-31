var express = require('express');
var router = express.Router();
const controller = require('../../controllers/users/users');
const auth = require('../../middleware/authMiddleware')

router.put('/', auth.isAuth, async function (req, res, next) {
    console.log("PUT /change_password");

    const requestedUserId = req.user.uid;

    if (!(req.user.role_name === 'admin' || requestedUserId === req.body.uid)) {
        msg = { msg: "Unauthorized. Forbidden" }
        res.status(403).send(JSON.stringify(msg, null, 4));
        return;
    }

    const uid = req.body.uid;
    const old_password = req.body.old_password;
    const new_password = req.body.new_password;

    if (!uid || !old_password || !new_password) {
        msg = { msg: "Bad Request" }
        res.status(400).send(JSON.stringify(msg, null, 4));
        return;
    }

    try {
        const result = await controller.changePassword(uid, old_password, new_password);
        
        if (result === 404) {
            msg = { msg: "No Account Found" }
            res.status(404).send(JSON.stringify(msg, null, 4));
        } else if (result === 401) {
            msg = { msg: "Unathorize. Incorrect Old Password" }
            res.status(401).send(JSON.stringify(msg, null, 4));
        } else if (result === null) {
            msg = { msg: "No Account Found" }
            res.status(404).send(JSON.stringify(msg, null, 4));
        } else if (result) {
            msg = { uid: uid, msg: `password changed` }
            res.status(200).send(JSON.stringify(msg, null, 4));
        } else {
            msg = { msg: "No Account Found" }
            res.status(404).send(JSON.stringify(msg, null, 4));
        }
    } catch (err) {
        console.log('An error occurred:', err);
        msg = { msg: "Internal server error" }
        res.status(500).send(JSON.stringify(msg, null, 4));
    }
});


router.put('/reset', auth.isAuth, async function (req, res, next) {
    console.log("PUT /change_password/reset");

    if (req.user.role_name !== 'admin') {
        msg = { msg: "Unauthorized. Forbidden" }
        res.status(403).send(JSON.stringify(msg, null, 4));
        return;
    }

    const email = req.body.email;
    const new_password = req.body.new_password;

    if (!new_password) {
        msg = { msg: "Bad Request" }
        res.status(400).send(JSON.stringify(msg, null, 4));
        return;
    }

    try {
        const result = await controller.changePassword(email, new_password);

        if (result) {
            msg = { email: email, msg: `password reseted` }
            res.status(200).send(JSON.stringify(msg, null, 4));
        } else {
            msg = { msg: "No Account Found" }
            res.status(404).send(JSON.stringify(msg, null, 4));
        }
    } catch (err) {
        console.log('An error occurred:', err);
        msg = { msg: "Internal server error" }
        res.status(500).send(JSON.stringify(msg, null, 4));
    }
});
module.exports = router;
