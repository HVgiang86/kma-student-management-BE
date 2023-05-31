var express = require('express');
var router = express.Router();
const controller = require('../../controllers/login');
var auth = require('../../middleware/authMiddleware')

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login and get token
 *     description: Login and get JWT token
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  example: useremail@gmail.com
 *                password:
 *                  type: string
 *                  example: password
 *     responses:
 *        200:
 *          description: Created user
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:    
 *                    type: string
 *                    example: Authorized
 *                  token:  
 *                    type: string
 *                    example: JWT token ... 
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
                msg: "Authorized",
                token: auth.genToken(result.uid, result.email,)
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