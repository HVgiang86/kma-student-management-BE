var express = require('express');
var router = express.Router();
const controller = require('../../controllers/users/users');
const auth = require('../../middleware/authMiddleware')



/**
 * @swagger
 * components:
 *   schemas:
 *     ToCreateUsers:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - first_name
 *         - last_name
 *         - role
 *         - gender
 *       properties:
 *         email:
 *           type: string
 *           description: email
 *         password:
 *           type: string
 *           description: password
 *         first_name:
 *           type: string
 *           description: first_name
 *         last_name:
 *           type: string
 *           description: last_name
 *         gender:
 *           type: string
 *           description: gender
 *           enum: [male, female, other]
 *         date_of_birth:
 *           type: string
 *           description: date_of_birth
 *         citizen_id:
 *           type: string
 *           description: citizen_id
 *         religion:
 *           type: string
 *           description: religion
 *         nationality:
 *           type: string
 *           description: nationality
 *         phone_number:
 *           type: string
 *           description: phone_number
 *         address:
 *           type: string
 *           description: address
 *         role:
 *           type: string
 *           description: role
 *           enum: [admin, student]
 *       example:
 *         email: "email@gmail.com"
 *         password: "password"
 *         first_name: "Hoang Van"
 *         last_name: "Giang"
 *         gender: "male"
 *         date_of_birth: "1999-01-01"
 *         citizen_id: "123456789"
 *         religion: "none"
 *         nationality: "Vietnam"
 *         phone_number: "123456789"
 *         address: "123 Nguyen Van Linh"
 *         role: "admin"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     DisplayUsers:
 *       type: object
 *       properties:
 *          uid:
 *            type: string
 *            description: uid
 *          first_name:
 *            type: string
 *            description: first_name
 *          last_name:
 *            type: string
 *            description: last_name
 *          email:
 *            type: string
 *            description: email
 *          phone_number:
 *            type: string
 *            description: phone_number
 *          address:
 *            type: string
 *            description: address
 *          date_of_birth:
 *            type: string
 *            description: date_of_birth
 *          citizen_id:
 *            type: string
 *            description: citizen_id
 *          religion:
 *            type: string
 *            description: religion
 *          nationality:
 *            type: string
 *            description: nationality
 *          gender:
 *            type: string
 *            description: gender
 *            enum: [male, female, other]
 *          role:
 *            type: string
 *            description: role
 *            enum: [admin, student]
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ToUpdateUsers:
 *       type: object
 *       properties:
 *          uid:
 *            type: string
 *            description: uid
 *          first_name:
 *            type: string
 *            description: first_name
 *          last_name:
 *            type: string
 *            description: last_name
 *          phone_number:
 *            type: string
 *            description: phone_number
 *          address:
 *            type: string
 *            description: address
 *          date_of_birth:
 *            type: string
 *            description: date_of_birth
 *          citizen_id:
 *            type: string
 *            description: citizen_id
 *          religion:
 *            type: string
 *            description: religion
 *          nationality:
 *            type: string
 *            description: nationality
 *          gender:
 *            type: string
 *            description: gender
 *            enum: [male, female, other]
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserToDelete:
 *       type: object
 *       properties:
 *          uid:
 *            type: string
 *            description: uid
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           description: message
 */

/**
 * @swagger
 * /users:
 *   get:
 *     security:
 *        - bearerAuth: []
 *     summary: Get all users 
 *     description: Get all users
 *     responses:
 *        200:
 *          description: Created user
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/DisplayUsers'
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
router.get('/', auth.isAuth, async function (req, res, next) {
  console.log("GET /users");
  try {
    if (req.user.role_name !== 'admin') {
      msg = { msg: "Unauthorized. Forbidden" }
      res.status(403).send(JSON.stringify(msg, null, 4));
      return;
    }

    const result = await controller.getUserList();
    if (result && result.length > 0) {
      const display = result.map(user => controller.copyUserWithoutPassword(user));
      res.status(200).send(JSON.stringify(display, null, 4));
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
 * /users:
 *   delete:
 *     security:
 *        - bearerAuth: []
 *     summary: Delete a user by uid
 *     description: Delete a user by uid
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                uid:
 *                  type: string
 *                  example: 123456789
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
 *                    example: Deleted user with uid 
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
router.delete('/', auth.isAuth, async function (req, res, next) {
  console.log("DELETE /users");
  try {

    if (req.user.role_name !== 'admin') {
      msg = { msg: "Unauthorized. Forbidden" }
      res.status(403).send(JSON.stringify(msg, null, 4));
      return;
    }

    const uid = req.body.uid;
    const result = await controller.deleteByUid(uid);

    if (result) {
      msg = { msg: `Deleted user with uid: ${uid}` }
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
 * /users:
 *   put:
 *     security:
 *        - bearerAuth: []
 *     summary: Update a user
 *     description: Update a user
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ToUpdateUsers'
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
 *                    example: Deleted user with uid 
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
  console.log("PUT /users");
  try {
    const requestedUserId = req.user.uid;

    if (!(req.user.role_name === 'admin' || requestedUserId === req.body.uid)) {
      msg = { msg: "Unauthorized. Forbidden" }
      res.status(403).send(JSON.stringify(msg, null, 4));
      return;
    }

    const uid = req.body.uid;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const phone_number = req.body.phone_number;
    const address = req.body.address;
    const date_of_birth = req.body.date_of_birth;
    const citizen_id = req.body.citizen_id;
    const religion = req.body.religion;
    const nationality = req.body.nationality;
    const gender = req.body.gender;

    const user = {
      uid: uid, first_name: first_name, last_name: last_name, phone_number: phone_number, address: address, date_of_birth: date_of_birth, citizen_id: citizen_id,
      religion: religion, nationality: nationality, gender: gender
    }

    //justify
    for (let key in user) {
      if (user[key] === undefined) {
        user[key] = "";
      }
    }


    if (user.uid.length == 0 || user.first_name.length == 0 || user.last_name.length == 0)
      res.status(400).send(JSON.stringify("Invalid input", null, 4));

    const result = await controller.updateUser(user);

    if (result) {
      console.log("Updated user: " + JSON.stringify(result, null, 4));
      const display = controller.copyUserWithoutPassword(result);
      res.status(200).send(JSON.stringify(display, null, 4));

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
 * /users:
 *   post:
 *     summary: Create a new user 
 *     description: Create a new user
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ToCreateUsers'
 *     responses:
 *        200:
 *          description: Created user
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/DisplayUsers'
 *        400:
 *          description: Invalid input
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Invalid input
 *        409:
 *          description: Email already exists
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Email already exists
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
router.post('/', async function (req, res, next) {
  console.log("POST /users");
  try {
    if (!req.body.email || !req.body.password || !req.body.first_name || !req.body.last_name || !req.body.role || !req.body.gender) {
      msg = { msg: "Internal server error" }
      res.status(400).send(JSON.stringify(msg, null, 4));
    }
  
    const email = req.body.email
    const password = req.body.password
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const phone_number = req.body.phone_number;
    const address = req.body.address;
    const date_of_birth = req.body.date_of_birth;
    const citizen_id = req.body.citizen_id;
    const religion = req.body.religion;
    const nationality = req.body.nationality;
    const gender = req.body.gender;
    const role = req.body.role;
  
    const user = {
      email: email, password: password, first_name: first_name, last_name: last_name, phone_number: phone_number, address: address, date_of_birth: date_of_birth, citizen_id: citizen_id,
      religion: religion, nationality: nationality, gender: gender, role: role
    }
  
    //justify
    for (let key in user) {
      if (user[key] === undefined) {
        user[key] = "";
      }
    }
  
    if (user.email.length == 0 || user.password.length == 0 || user.first_name.length == 0 || user.last_name.length == 0 || user.role.length == 0 || user.gender.length == 0) {
      msg = { msg: "Internal server error" }
      res.status(400).send(JSON.stringify(msg, null, 4));
    }

    const result = await controller.create(user);
    console.log("result: " + result);

    if (result) {
      console.log("Created user: " + JSON.stringify(result, null, 4));
      const display = controller.copyUserWithoutPassword(result);
      res.status(200).send(JSON.stringify(display, null, 4));

    } else {
      console.log("router: Email already exists")
      msg = { msg: "Email already exists" }

      res.status(409).send(JSON.stringify(msg, null, 4));
    }
  } catch (err) {
    console.log('An error occurred:', err);
    msg = { msg: "Internal server error" }
    res.status(500).send(JSON.stringify(msg, null, 4));
  }

});

module.exports = router;
