var express = require('express');
var router = express.Router();
var controller = require('../../controllers/class/studentClass');
const auth = require('../../middleware/authentication');

/**
 * @swagger
 * components:
 *   schemas:
 *     StudentClassContainsStudent:
 *       type: object
 *       properties:
 *         class_id:
 *           type: string
 *           description: class_id
 *         class_name:
 *           type: string
 *           description: class_name
 *         students:
 *           type: array
 *           description: student list
 *           items:
 *              $ref: '#/components/schemas/DisplayStudent'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     StudentClass:
 *       type: object
 *       properties:
 *         class_id:
 *           type: string
 *           description: class_id
 *         class_name:
 *           type: string
 *           description: class_name
 */

/**
 * @swagger
 * /studentClass:
 *   get:
 *     security:
 *        - bearerAuth: []
 *     tags:
 *        - StudentClass
 *     summary: Get all Student Classes 
 *     description: Get all Student Classes
 *     responses:
 *        200:
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/StudentClass'
 *        404:
 *          description: No studentClass found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: No studentClass found
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
// Get all studentClass
router.get('/', auth.isAuth, async (req, res) => {
    try {
        const result = await controller.getStudentClassList();

        if (result) {
            console.log("Get studentClass list: " + JSON.stringify(result, null, 4));
            return res.status(200).json(result);
        } else { // No studentClass found
            return res.status(404).json({ msg: 'No studentClass found' });
        }
    } catch (err) {
        console.log("An error occurred: " + err);
        return res.status(500).json({ msg: 'Internal server error' });
    }
});

/**
 * @swagger
 * /studentClass/{id}:
 *   get:
 *     security:
 *        - bearerAuth: []
 *     tags:
 *        - StudentClass
 *     summary: Get studentClass by id
 *     description: Get studentClass by id
 *     responses:
 *        200:
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/StudentClassContainsStudent'
 *        404:
 *          description: No studentClass found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: No studentClass found
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
router.get('/:id', auth.isAuth, async (req, res) => {
    try {
        const result = await controller.getStudentClassById(req.params.id);

        if (result === '404') {
            return res.status(404).json({ msg: 'No studentClass found' });
        } else if (result) {
            console.log("Get studentClass by id: " + JSON.stringify(result, null, 4));
            return res.status(200).json(result);
        } else {
            return res.status(500).json({ msg: 'Internal server error' });
        }
    } catch (err) {
        console.log("An error occurred: " + err);
        return res.status(500).json({ msg: 'Internal server error' });
    }
});

/**
 * @swagger
 * /studentClass:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *        - StudentClass
 *     summary: Update a studentClass
 *     description: Update a studentClass
 *     requestBody:
 *       required: true
 *       content: 
 *          application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  old_name:
 *                      type: string
 *                      example: "CT5D"
 *                  new_name:
 *                      type: string
 *                      example: "CT5E"
 *     responses:
 *       200:
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                items:
 *                  $ref: '#/components/schemas/StudentClass'
 *       400:
 *          description: Invalid input
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Invalid input
 *       403:
 *          description: Unauthorized. Forbidden
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Unauthorized. Forbidden
 *       404:
 *          description: No StudentClass Found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: No StudentClass Found
 *       409:
 *          description: StudentClass name already exists
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: StudentClass name already exists
 *       500:
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
router.put('/', auth.isAuth, async (req, res) => {
    try {
        if (req.user.role_name !== 'admin') {
            msg = { msg: "Unauthorized. Forbidden" }
            res.status(403).send(JSON.stringify(msg, null, 4));
            return;
        }

        const old_name = req.body.old_name;
        const new_name = req.body.new_name;

        if (!old_name || !new_name) {
            msg = { msg: "Invalid input" }
            res.status(400).send(JSON.stringify(msg, null, 4));
            return;
        }

        const result = await controller.update(old_name, new_name);

        if (result === '404') {
            return res.status(404).json({ msg: 'No studentClass found' });
        } else if (result === '409') {
            return res.status(409).json({ msg: 'StudentClass name already exists' });
        } else if (result) {
            console.log("Update studentClass: " + JSON.stringify(result, null, 4));
            return res.status(200).json(result);
        } else {
            return res.status(500).json({ msg: 'Internal server error' });
        }
    } catch (err) {
        console.log("An error occurred: " + err);
        return res.status(500).json({ msg: 'Internal server error' });
    }
});

/**
 * @swagger
 * /studentClass:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *        - StudentClass
 *     summary: Create a studentClass
 *     description: Create a studentClass
 *     requestBody:
 *       required: true
 *       content: 
 *          application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  class_name:
 *                      type: string
 *                      example: CT5D
 *     responses:
 *       200:
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                items:
 *                  $ref: '#/components/schemas/StudentClass'
 *       400:
 *          description: Invalid input
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Invalid input
 *       403:
 *          description: Unauthorized. Forbidden
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Unauthorized. Forbidden
 *       500:
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
router.post('/', auth.isAuth, async (req, res) => {
    try {
        if (req.user.role_name !== 'admin') {
            msg = { msg: "Unauthorized. Forbidden" }
            res.status(403).send(JSON.stringify(msg, null, 4));
            return;
        }

        const class_name = req.body.class_name;

        if (!class_name) {
            msg = { msg: "Invalid input" }
            res.status(400).send(JSON.stringify(msg, null, 4));
            return;
        }

        const studentClass = {
            id: class_name,
            class_name: class_name
        }

        const result = await controller.create(studentClass);

        if (result) {
            console.log("Create studentClass: " + JSON.stringify(result, null, 4));
            return res.status(200).json(result);
        } else {
            return res.status(409).json({ msg: 'StudentClass name already exists' });
        }
    } catch (err) {
        console.log("An error occurred: " + err);
        return res.status(500).json({ msg: 'Internal server error' });
    }
});

/**
 * @swagger
 * /studentClass:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *        - StudentClass
 *     summary: Delete a studentClass by id
 *     description: Delete a studentClass by id
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                class_name:
 *                  type: string
 *                  example: CT5D
 *     responses:
 *       200:
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Deleted successfully
 *       400:
 *          description: Bad Request. Class has students?
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Class has students?
 *       404:
 *          description: No StudentClass Found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: No StudentClass Found
 *       403:
 *          description: Unauthorized. Forbidden
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Unauthorized. Forbidden
 *       500:
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
router.delete('/', auth.isAuth, async (req, res) => {
    try {
        if (req.user.role_name !== 'admin') {
            msg = { msg: "Unauthorized. Forbidden" }
            res.status(403).send(JSON.stringify(msg, null, 4));
            return;
        }

        const id = req.body.class_name

        const result = await controller.deleteById(id);

        if (result === '404') {
            return res.status(404).json({ msg: 'No studentClass found' });
        } else if (result === '409') {
            return res.status(409).json({ msg: 'StudentClass has students' });
        } else if (result === '200') {
            return res.status(200).json({ msg: 'Delete studentClass successfully' });
        } else {
            return res.status(500).json({ msg: 'Internal server error' });
        }


    } catch (err) {
        console.log('An error occurred:', err);
        msg = { msg: "Internal server error" }
        res.status(500).send(JSON.stringify(msg, null, 4));
    }
});

/**
 * @swagger
 * /studentClass/addStudent:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *        - StudentClass
 *     summary: Add a student to a studentClass
 *     description: Add a student to a studentClass
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                class_name:
 *                  type: string
 *                  example: CT5D
 *                student_code:
 *                  type: string
 *                  example: CT050413
 *     responses:
 *       200:
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Add student successfully
 *       400:
 *          description: Invalid input
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Invalid input
 *       404:
 *          description: No StudentClass Found or No Student Found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: No StudentClass Found or No Student Found
 *       403:
 *          description: Unauthorized. Forbidden
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Unauthorized. Forbidden
 *       500:
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
router.post('/addStudent', auth.isAuth, async (req, res) => {
    try {
        if (req.user.role_name !== 'admin') {
            msg = { msg: "Unauthorized. Forbidden" }
            res.status(403).send(JSON.stringify(msg, null, 4));
            return;
        }

        const class_name = req.body.class_name
        const student_code = req.body.student_code

        if (!class_name || !student_code) {
            msg = { msg: "Invalid input" }
            res.status(400).send(JSON.stringify(msg, null, 4));
            return;
        }

        const result = await controller.addStudentToClass(student_code, class_name);

        if (result === '404') {
            return res.status(404).json({ msg: 'Student or StudentClass not found' });
        } else if (result === '200') {
            return res.status(200).json({ msg: 'Add student successfully' });
        } else {
            return res.status(500).json({ msg: 'Internal server error' });
        }


    } catch (err) {
        console.log('An error occurred:', err);
        msg = { msg: "Internal server error" }
        res.status(500).send(JSON.stringify(msg, null, 4));
    }
});

/**
 * @swagger
 * /studentClass/removeStudent:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *        - StudentClass
 *     summary: Remove a student from a studentClass
 *     description:  Remove a student from a studentClass
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                class_name:
 *                  type: string
 *                  example: CT5D
 *                student_code:
 *                  type: string
 *                  example: CT050413
 *     responses:
 *       200:
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Remove student successfully
 *       400:
 *          description: Invalid input
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Invalid input
 *       404:
 *          description: No StudentClass Found or No Student Found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: No StudentClass Found or No Student Found
 *       403:
 *          description: Unauthorized. Forbidden
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Unauthorized. Forbidden
 *       409:
 *          description: Student is not in this class
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example:  Student is not in this class
 *       500:
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
router.delete('/removeStudent', auth.isAuth, async (req, res) => {
    try {
        if (req.user.role_name !== 'admin') {
            msg = { msg: "Unauthorized. Forbidden" }
            res.status(403).send(JSON.stringify(msg, null, 4));
            return;
        }

        const class_name = req.body.class_name
        const student_code = req.body.student_code

        if (!class_name || !student_code) {
            msg = { msg: "Invalid input" }
            res.status(400).send(JSON.stringify(msg, null, 4));
            return;
        }

        const result = await controller.addStudentToClass(student_code, class_name);

        if (result === '404') {
            return res.status(404).json({ msg: 'Student or StudentClass not found' });
        } else if (result === '409') {
            return res.status(409).json({ msg: 'Student is not in this class' });
        }
        else if (result === '200') {
            return res.status(200).json({ msg: 'Remove student successfully' });
        } else {
            return res.status(500).json({ msg: 'Internal server error' });
        }


    } catch (err) {
        console.log('An error occurred:', err);
        msg = { msg: "Internal server error" }
        res.status(500).send(JSON.stringify(msg, null, 4));
    }
});

module.exports = router;