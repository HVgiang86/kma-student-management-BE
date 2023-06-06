var express = require('express');
var router = express.Router();
const controller = require('../../controllers/login');
var auth = require('../../middleware/authentication');

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginAccount:
 *       type: object
 *       properties:
 *          email:
 *              type: string
 *              example: useremail@gmail.com
 *          password:
 *              type: string
 *              example: password
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login and get token, user id
 *     description: Login and get JWT token, user id
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginAccount'
 *     responses:
 *        200:
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  token:  
 *                    type: string
 *                    example: JWT token ... 
 *                  uid:    
 *                    type: string
 *                    example: uid_string
 *                  msg:  
 *                    type: string
 *                    example: Authorized 
 *                  
 *        401:
 *          description: Unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Unauthorized
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
                token: auth.genToken(result.uid, result.email,),
                uid: result.uid,
                msg: "Authorized"
            }
            res.status(200).send(JSON.stringify(msg, null, 4));
        }
    } catch (err) {
        console.log('An error occurred:', err);
        msg = { msg: "Internal server error" }
        res.status(500).send(JSON.stringify(msg, null, 4));
    }

});

module.exports = router;