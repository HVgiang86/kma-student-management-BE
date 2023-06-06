var express = require('express');
var router = express.Router();
const controller = require('../../controllers/subject/subject');
const auth = require('../../middleware/authentication');

/**
 * @swagger
 * components:
 *   schemas:
 *     Subject:
 *       type: object
 *       properties:
 *          id:
 *            type: string
 *            description: id
 *            example: ktmt
 *          credits:
 *            type: integer
 *            description: credits of subject
 *            example: 2
 *          subject_name:
 *            type: string
 *            description: subject name
 *            example: Kiến trúc máy tính
 */

/**
 * @swagger
 * /subject:
 *   get:
 *     security:
 *        - bearerAuth: []
 *     tags:
 *        - Subject
 *     summary: Get all subjects 
 *     description: Get all subjects
 *     responses:
 *        200:
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Subject'
 *        404:
 *          description: Subject not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Subject not found
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
router.get('/', auth.isAuth, auth.isAuth, async function (req, res, next) {
    try {
        const result = await controller.getSubjectList();

        if (result && result.length > 0) {
            console.log("Subject list: " + JSON.stringify(result, null, 4));
            res.status(200).send(JSON.stringify(result, null, 4));
        } else {
            msg = { msg: "Subject not found" }
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
 * /subject:
 *   put:
 *     security:
 *        - bearerAuth: []
 *     tags:
 *        - Subject
 *     summary: Upadate a schedule 
 *     description: Upadate a schedule 
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Subject'
 *     responses:
 *        200:
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                items:
 *                  $ref: '#/components/schemas/Subject'
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
 *        404:
 *          description: Subject not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Subject not found
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
    try {
        const id = req.body.id;
        const credits = req.body.credits;
        const subject_name = req.body.subject_name;

        subject = {
            id: id,
            credits: credits,
            subject_name: subject_name
        }

        if (!id || !credits || !subject_name) {
            msg = { msg: "Invalid input" }
            res.status(400).send(JSON.stringify(msg, null, 4));
            return;
        }

        const result = await controller.update(subject);

        if (result) {
            console.log("Update subject: " + JSON.stringify(result, null, 4));
            res.status(200).send(JSON.stringify(result, null, 4));
        } else {
            msg = { msg: "Subject not found" }
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
 * /subject:
 *   post:
 *     security:
 *        - bearerAuth: []
 *     tags:
 *        - Subject
 *     summary: Create a subject 
 *     description: Create a subject 
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Subject'
 *     responses:
 *        200:
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                items:
 *                  $ref: '#/components/schemas/Subject'
 *        404:
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
 *          description: Subject already exists
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Subject already exists
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
router.post('/', auth.isAuth, async function (req, res, next) {
    try {
        const id = req.body.id;
        const credits = req.body.credits;
        const subject_name = req.body.subject_name;

        subject = {
            id: id,
            credits: credits,
            subject_name: subject_name
        }

        if (!id || !credits || !subject_name) {
            msg = { msg: "Invalid input" }
            res.status(400).send(JSON.stringify(msg, null, 4));
            return;
        }

        const result = await controller.create(subject);
        if (result) {
            console.log("Create subject: " + JSON.stringify(result, null, 4));
            res.status(200).send(JSON.stringify(result, null, 4));
        } else {
            msg = { msg: "Subject already exists" }
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
 * /subject:
 *   delete:
 *     security:
 *        - bearerAuth: []
 *     tags:
 *        - Subject
 *     summary: Delete a subject by id
 *     description: Delete a subject by id
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                  example: ktmt
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
 *                    example: Subject deleted
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
 *        404:
 *          description: Subject not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Subject not found
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
    try {
        const id = req.body.id;

        if (!id) {
            msg = { msg: "Invalid input" }
            res.status(400).send(JSON.stringify(msg, null, 4));
        }

        const result = await controller.delete(id);
        if (result === 400) {
            msg = { msg: "Bad request. This subject has classes" }
            res.status(400).send(JSON.stringify(msg, null, 4));
        } else if (result === 404) {
            msg = { msg: "Schedule not found" }
            res.status(404).send(JSON.stringify(msg, null, 4));
        } else if (result === 200) {
            msg = { msg: "Schedule deleted" }
            res.status(200).send(JSON.stringify(msg, null, 4));
        } else {
            msg = { msg: "Internal server error" }
            res.status(500).send(JSON.stringify(msg, null, 4));
        }
    } catch (err) {
        console.log('An error occurred:', err);
        msg = { msg: "Internal server error" }
        res.status(500).send(JSON.stringify(msg, null, 4));
    }
});

//lay danh sach cac lop cua mon
router.get('/:id/class', auth.isAuth, async function (req, res) { });

//lay danh sach cac sinh vien dk mon
router.get('/:id/student', auth.isAuth, async function (req, res) { });

//Lay bang diem
router.get('/:id/score', auth.isAuth, async function (req, res) { });

module.exports = router;