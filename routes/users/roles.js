
var express = require('express');
var router = express.Router();
const controller = require('../../controllers/users/users');
const auth = require('../../middleware/authentication');


/**
 * @swagger
 * /change_role:
 *   put:
 *     summary: Change role of a user. Only admin can do this
 *     description: Change role of a user. Only admin can do this
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                uid:
 *                  type: string
 *                new_role:
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
    console.log("PUT /change_role");
    console.log(req.user.role_name);

    if (req.user.role_name !== 'admin') {
        msg = { msg: "Unauthorized. Forbidden" }
        res.status(403).send(JSON.stringify(msg, null, 4));
        return;
    }

    const uid = req.body.uid;
    const new_role = req.body.new_role;

    try {
        const result = await controller.changeRole(uid, new_role);

        if (result === 400) {
            msg = { msg: "Bad Request. Not a valid role" }
            res.status(400).send(JSON.stringify(msg, null, 4));
        } else if (result === 404) {
            msg = { msg: "No Account Found" }
            res.status(404).send(JSON.stringify(msg, null, 4));
        } else if (result) {
            console.log(`Changed role for user with uid: ${uid} to role ${new_role}`);
            msg = { uid: uid, new_role: `${new_role}` }
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