var express = require('express');
var router = express.Router();
const controller = require('../../controllers/users/users');
var auth = require('../../middleware/authentication');

/**
 * @swagger
 * /change_password:
 *   put:
 *     tags:
 *        - Password
 *     summary: Change password of a user
 *     description: Change password of a user. Only admin or account owner can do this
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                uid:
 *                  type: string
 *                old_password:
 *                  type: string
 *                new_password:
 *                  type: string  
 *     responses:
 *        200:
 *          description: Created user
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  uid:
 *                    type: string
 *                  new_role:
 *                    type: string
 *        400:
 *          description: Bad Request. Not a valid role
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Bad Request. Not a valid role
 *        401:
 *          description: Unathorize. Incorrect Old Password
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Unathorize. Incorrect Old Password
 *        403:
 *          description: Unauthorized. Forbidden
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Unauthorized. Forbidden
 *        404:
 *          description: No Account Found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: No Account Found
 *        500:
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Internal server error
 */
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
        const result = await controller.changePasswordWithUid(uid, old_password, new_password);

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


/**
 * @swagger
 * /change_password/reset:
 *   put:
 *     tags:
 *        - Password
 *     summary: Change role of a user. Only admin can do this
 *     description: Change role of a user. Only admin can do this
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                new_password:
 *                  type: string  
 *     responses:
 *        200:
 *          description: Created user
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  uid:
 *                    type: string
 *                  new_role:
 *                    type: string
 *        400:
 *          description: Bad Request. Not a valid role
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Bad Request. Not a valid role
 *        403:
 *          description: Unauthorized. Forbidden
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Unauthorized. Forbidden
 *        404:
 *          description: No Account Found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: No Account Found
 *        500:
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Internal server error
 */
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
