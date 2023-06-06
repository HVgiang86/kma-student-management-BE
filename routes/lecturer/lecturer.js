var express = require('express');
var router = express.Router();
const controller = require('../../controllers/lecturer/lecturer');
const auth = require('../../middleware/authentication');

/**
 * @swagger
 * components:
 *   schemas:
 *     Lecturer:
 *       type: object
 *       properties:
 *          id:
 *            type: string
 *            description: id
 *            example: GV0001
 *          faculty_id:
 *            type: integer
 *            description: faculty_id
 *            example: 1
 *          lecturer_name:
 *            type: string
 *            description: lecturer_name
 *            example: Nguyễn Văn A
 */

/**
 * @swagger
 * /lecturer:
 *   get:
 *     security:
 *        - bearerAuth: []
 *     tags:
 *        - Lecturer
 *     summary: Get all lecturers
 *     description: Get all lecturers
 *     responses:
 *        200:
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Lecturer'
 *        404:
 *          description: No Lecturer Found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: No Lecturer Found
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
router.get('/', auth.isAuth, async function (req, res) {
    console.log("GET /lecturer");
    try {
        const result = await controller.getLecturerList();
        if (result && result.length > 0) {
            res.status(200).send(JSON.stringify(result, null, 4));
        } else {
            msg = { msg: "No Lecturer Found" }
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
 * /lecturer/{id}:
 *   get:
 *     security:
 *        - bearerAuth: []
 *     tags:
 *        - Lecturer
 *     summary: Get lecturer by id
 *     description: Get lecturer by id
 *     responses:
 *        200:
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                items:
 *                  $ref: '#/components/schemas/Lecturer'
 *        400:
 *          description: Bad request. Parameter missing
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Bad request. Parameter missing
 *        404:
 *          description: No Lecturer Found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: No Lecturer Found
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
router.get('/:id', auth.isAuth, async function (req, res) {
    console.log("GET /lecturer/:id");
    try {
        if (!req.params.id) {
            msg = { msg: "Bad request. Parameter missing" }
            res.status(400).send(JSON.stringify(msg, null, 4));
            return;
        }

        const result = await controller.getLecturer(req.params.id);

        if (result) {
            res.status(200).send(JSON.stringify(result, null, 4));
        } else {
            msg = { msg: "No Lecturer Found" }
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
 * /lecturer:
 *   put:
 *     security:
 *        - bearerAuth: []
 *     tags:
 *        - Lecturer
 *     summary: Update a lecturer
 *     description: Update a lecturer
 *     requestBody:
 *        description: lecturer object
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *               items:
 *                 $ref: '#/components/schemas/Lecturer'
 *     responses:
 *        200:
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                items:
 *                  $ref: '#/components/schemas/Lecturer'
 *        400:
 *          description: Bad request. Body parameters missing
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Bad request. Body parameters missing
 *        404:
 *          description: No Lecturer Found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: No Lecturer Found
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
router.put('/', auth.isAuth, async function (req, res) {
    console.log("PUT /lecturer");
    try {
        if (!req.body.id || !req.body.faculty_id || !req.body.lecturer_name) {
            msg = { msg: "Bad request. Body parameters missing" }
            res.status(400).send(JSON.stringify(msg, null, 4));
            return;
        }

        var id = req.body.id;
        var faculty_id = req.body.faculty_id;
        var lecturer_name = req.body.lecturer_name;

        lecturer = { id: id, faculty_id: faculty_id, lecturer_name: lecturer_name };

        const result = await controller.update(lecturer);

        if (result) {
            res.status(200).send(JSON.stringify(result, null, 4));
        } else {
            msg = { msg: "Lecturer ID not exists" }
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
 * /lecturer:
 *   post:
 *     security:
 *        - bearerAuth: []
 *     tags:
 *        - Lecturer
 *     summary: Create a lecturer
 *     description: Create a lecturer
 *     requestBody:
 *        description: lecturer object
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *               type: object
 *               properties:
 *                  faculty_id:
 *                     type: integer
 *                     description: faculty_id
 *                     example: 1
 *                  lecturer_name:
 *                     type: string
 *                     description: lecturer_name
 *                     example: Nguyễn Văn A
 *                  
 *     responses:
 *        200:
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                items:
 *                  $ref: '#/components/schemas/Lecturer'
 *        400:
 *          description: Bad request. Body parameters missing
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Bad request. Body parameters missing
 *        409:
 *          description: Lecturer Name already exists
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Lecturer Name already exists
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
router.post('/', auth.isAuth, async function (req, res) {
    console.log("POST /lecturer");
    try {
        if (!req.body.faculty_id || !req.body.lecturer_name) {
            msg = { msg: "Bad request. Body parameters missing" }
            res.status(400).send(JSON.stringify(msg, null, 4));
            return;
        }

        var faculty_id = req.body.faculty_id;
        var lecturer_name = req.body.lecturer_name;

        lecturer = { faculty_id: faculty_id, lecturer_name: lecturer_name };

        const result = await controller.create(lecturer);

        if (result) {
            res.status(200).send(JSON.stringify(result, null, 4));
        } else {
            msg = { msg: "Lecturer Name already exists" }
            res.status(409).send(JSON.stringify(msg, null, 4));
        }
    } catch (err) {
        console.log('An error occurred:', err);
        msg = { msg: "Internal server error" }
        res.status(500).send(JSON.stringify(msg, null, 4));
    }
});

/**
 * @swagger
 * /lecturer:
 *   delete:
 *     security:
 *        - bearerAuth: []
 *     tags:
 *        - Lecturer
 *     summary: Delete a lecturer
 *     description: Delete a lecturer
 *     requestBody:
 *        description: lecturer object
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *               type: object
 *               properties:
 *                  id:
 *                     type: string
 *                     description: lecturer id
 *                     example: GV0001
 *                  
 *     responses:
 *        200:
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Delete lecturer successfully
 *        400:
 *          description: Bad request. Body parameters missing
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Bad request. Body parameters missing
 *        404:
 *          description: Lecturer ID not exists
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Lecturer ID not exists
 *        409:
 *          description: Bad request. Lecturer is referenced by other entities.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Bad request. Lecturer is referenced by other entities.
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
router.delete('/', auth.isAuth, async function (req, res) {
    console.log("DELETE /lecturer");
    try {
        if (!req.body.id) {
            msg = { msg: "Bad request. Body parameters missing" }
            res.status(400).send(JSON.stringify(msg, null, 4));
            return;
        }

        const result = await controller.delete(req.body.id);

        if (result === '200') {
            msg = { msg: "Delete lecturer successfully" }
            res.status(200).send(JSON.stringify(msg, null, 4));
        } else if (result === '404') {
            msg = { msg: "Lecturer ID not exists" }
            res.status(404).send(JSON.stringify(msg, null, 4));
        } else if (result === '409') {
            msg = { msg: "Lecturer is referenced by other entities: Faculty or SubjectClass" }
            res.status(409).send(JSON.stringify(msg, null, 4));
        } else {
            msg = { msg: "Delete lecturer failed" }
            res.status(500).send(JSON.stringify(msg, null, 4));
        }
    } catch (err) {
        console.log('An error occurred:', err);
        msg = { msg: "Internal server error" }
        res.status(500).send(JSON.stringify(msg, null, 4));
    }
});

/**
 * @swagger
 * /lecturer/{id}/subject_class:
 *   get:
 *     security:
 *        - bearerAuth: []
 *     tags:
 *        - Lecturer
 *     summary: Get all subject class of a lecturer
 *     description: Get all subject class of a lecturer
 *     responses:
 *        200:
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                items:
 *                  $ref: '#/components/schemas/SubjectClass'
 *        400:
 *          description: Bad request. Body parameters missing
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Bad request. Body parameters missing
 *        404:
 *          description: Lecturer ID not exists
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Lecturer ID not exists
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
//Lay danh sach lop do giang vien day
router.get('/:id/subject_class', auth.isAuth, async function (req, res) {
    console.log("GET /lecturer/:id/subject_class");
    try {
        if (!req.params.id) {
            msg = { msg: "Bad request. Parameter missing" }
            res.status(400).send(JSON.stringify(msg, null, 4));
            return;
        }

        const result = await controller.getSubjectClassByLecturer(req.params.id);

        if (result && result.length > 0) {
            res.status(200).send(JSON.stringify(result, null, 4));
        } else {
            msg = { msg: "No SubjectClass Found" }
            res.status(404).send(JSON.stringify(msg, null, 4));
        }
    } catch (err) {
        console.log('An error occurred:', err);
        msg = { msg: "Internal server error" }
        res.status(500).send(JSON.stringify(msg, null, 4));
    }
});



module.exports = router;