var express = require('express');
var router = express.Router();
const controller = require('../../controllers/major/major');
const auth = require('../../middleware/authentication');

/**
 * @swagger
 * components:
 *   schemas:
 *     Major:
 *       type: object
 *       properties:
 *          id:
 *            type: integer
 *            description: id
 *            example: 1
 *          major_name:
 *            type: string
 *            description: major name
 *            example: Công nghệ thông tin
 *          faculty_id:
 *            type: integer
 *            description: faculty id
 *            example: cntt
 */


/**
 * @swagger
 * /major:
 *   get:
 *     security:
 *        - bearerAuth: []
 *     summary: Get all majors 
 *     description: Get all majors
 *     responses:
 *        200:
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Major'
 *        404:
 *          description: Major not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Major not found
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
router.get('/', async (req, res) => {
    try {
        const result = await controller.getMajorList();

        if (result && result.length > 0) {
            console.log("Major list: " + JSON.stringify(result, null, 4));
            res.status(200).send(JSON.stringify(result, null, 4));
        } else {
            msg = { msg: "Major not found" }
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
 * /major:
 *   post:
 *     security:
 *        - bearerAuth: []
 *     summary: Create a major 
 *     description: Create a major 
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  major_name:
 *                      type: string
 *                      example: Công nghệ phần mềm nhúng
 *                  faculty_id: 
 *                      type: integer        
 *                      example: 1          
 *     responses:
 *        200:
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                items:
 *                  $ref: '#/components/schemas/Major'
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
 *          description: Major already exists
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Major already exists
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
router.post('/', async (req, res) => {
    try {
        const major_name = req.body.major_name;
        const faculty_id = req.body.faculty_id;

        if (!major_name || !faculty_id) {
            msg = { msg: "Invalid input" }
            res.status(400).send(JSON.stringify(msg, null, 4));
            return;
        }

        major = {
            major_name: major_name,
            faculty_id: faculty_id
        }

        const result = await controller.create(major);
        if (result) {
            console.log("Create major: " + JSON.stringify(result, null, 4));
            res.status(200).send(JSON.stringify(result, null, 4));
        } else {
            msg = { msg: "Major already exists" }
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
 * /major:
 *   put:
 *     security:
 *        - bearerAuth: []
 *     summary: Upadate a Major 
 *     description: Upadate a Major 
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Major'
 *     responses:
 *        200:
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                items:
 *                  $ref: '#/components/schemas/Major'
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
 *          description: Major not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Major not found
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
router.put('/', async (req, res) => {
    try {
        const id = req.body.id;
        const major_name = req.body.major_name;
        const faculty_id = req.body.faculty_id;

        if (!id || !major_name || !faculty_id) {
            msg = { msg: "Invalid input" }
            res.status(400).send(JSON.stringify(msg, null, 4));
            return;
        }

        major = {
            id: id,
            major_name: major_name,
            faculty_id: faculty_id
        }

        const result = await controller.update(major);

        if (result) {
            console.log("Update major: " + JSON.stringify(result, null, 4));
            res.status(200).send(JSON.stringify(result, null, 4));
        } else {
            msg = { msg: "Major not found" }
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
 * /major:
 *   delete:
 *     security:
 *        - bearerAuth: []
 *     summary: Delete a major by id
 *     description: Delete a major by id
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
 *                    example: Major deleted
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
 *          description: Major not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Major not found
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
router.delete('/', async (req, res) => {
    try {
        const id = req.body.id;

        const result = await controller.delete(id);
        if (result) {
            msg = { msg: "Delete major successfully" }
            res.status(200).send(JSON.stringify(msg, null, 4));
        } else {
            msg = { msg: "Major not found" }
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
 * /major/{id}/student:
 *   get:
 *     security:
 *        - bearerAuth: []
 *     summary: Get all students of major 
 *     description: Get all students of major 
 *     responses:
 *        200:
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/DisplayStudent'
 *        404:
 *          description: Student or Major not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example:  Student or Major  not found
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
//lay danh sach sinh vien chuyen nganh
router.get('/:id/student', async (req, res) => {
    console.log("Get student list of major: " + req.params.id);
    try {
        const id = req.params.id;

        const result = await controller.getStudentListByMajorId(id);
        if (result && result.length > 0) {
            console.log("Student list: " + JSON.stringify(result, null, 4));
            res.status(200).send(JSON.stringify(result, null, 4));
        } else {
            msg = { msg: "Student or Major not found" }
            res.status(404).send(JSON.stringify(msg, null, 4));
        }
    } catch (err) {
        console.log('An error occurred:', err);
        msg = { msg: "Internal server error" }
        res.status(500).send(JSON.stringify(msg, null, 4));
    }
});

module.exports = router;