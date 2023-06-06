var express = require('express');
var router = express.Router();
const controller = require('../../controllers/schedule/schedule');
const auth = require('../../middleware/authentication')

/**
 * @swagger
 * components:
 *   schemas:
 *     Schedule:
 *       type: object
 *       properties:
 *          id:
 *            type: string
 *            description: id
 *            example: ca1
 *          start_time:
 *            type: string
 *            description: first_name
 *            example: 12:30
 *          end_time:
 *            type: string
 *            description: last_name
 *            example: 18:00
 */

/**
 * @swagger
 * /schedule:
 *   get:
 *     security:
 *        - bearerAuth: []
 *     summary: Get all schedule 
 *     description: Get all schedule
 *     responses:
 *        200:
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Schedule'
 *        404:
 *          description: Schedule not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Schedule not found
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
    try {
        const result = await controller.getScheduleList();

        if (result && result.length > 0) {
            console.log("Schedule list: " + JSON.stringify(result, null, 4));
            res.status(200).send(JSON.stringify(result, null, 4));
        } else {
            msg = { msg: "Schedule not found" }
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
 * /schedule:
 *   put:
 *     security:
 *        - bearerAuth: []
 *     summary: Upadate a schedule 
 *     description: Upadate a schedule 
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Schedule'
 *     responses:
 *        200:
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                items:
 *                  $ref: '#/components/schemas/Schedule'
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
 *          description: Schedule not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Schedule not found
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
router.put('/', async function (req, res, next) {
    try {
        const id = req.body.id;
        const start_time = req.body.start_time;
        const end_time = req.body.end_time;

        schedule = {
            id: id,
            start_time: start_time,
            end_time: end_time
        }

        if (!id || !start_time || !end_time) {
            msg = { msg: "Invalid input" }
            res.status(400).send(JSON.stringify(msg, null, 4));
            return;
        }

        const result = await controller.update(schedule);

        if (result) {
            console.log("Schedule updated: " + JSON.stringify(result, null, 4));
            res.status(200).send(JSON.stringify(result, null, 4));
        } else {
            msg = { msg: "Schedule not found" }
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
 * /schedule:
 *   post:
 *     security:
 *        - bearerAuth: []
 *     summary: Create a schedule 
 *     description: Create a schedule 
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Schedule'
 *     responses:
 *        200:
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                items:
 *                  $ref: '#/components/schemas/Schedule'
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
 *          description: Schedule already exists
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Schedule already exists
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
        const start_time = req.body.start_time;
        const end_time = req.body.end_time;

        schedule = {
            id: id,
            start_time: start_time,
            end_time: end_time
        }

        if (!id || !start_time || !end_time) {
            msg = { msg: "Invalid input" }
            res.status(400).send(JSON.stringify(msg, null, 4));
            return;
        }

        const result = await controller.create(schedule);

        if (result) {
            console.log("Schedule created: " + JSON.stringify(result, null, 4));
            res.status(200).send(JSON.stringify(result, null, 4));
        } else {
            msg = { msg: "Schedule already exists" }
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
 * /schedule:
 *   delete:
 *     security:
 *        - bearerAuth: []
 *     summary: Delete a schedule by id
 *     description: Delete a schedule by id
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                  example: ca1
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
 *                    example: Schedule deleted
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
 *          description: Schedule not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Schedule not found
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

        const result = controller.delete(id);

        if (!result) {
            msg = { msg: "Schedule not found" }
            res.status(404).send(JSON.stringify(msg, null, 4));
        } else {
            msg = { msg: "Schedule deleted" }
            res.status(200).send(JSON.stringify(msg, null, 4));
        }
    } catch (err) {
        console.log('An error occurred:', err);
        msg = { msg: "Internal server error" }
        res.status(500).send(JSON.stringify(msg, null, 4));
    }
});

//Lay danh sach cac lop ca hoc nay
router.get('/:id/class', auth.isAuth, async function (req, res, next) { });

module.exports = router;