var express = require('express');
var router = express.Router();
var controller = require('../../controllers/class/subjectClass');
const studentController = require('../../controllers/student/student');
const auth = require('../../middleware/authentication');
/**
 * @swagger
 * components:
 *   schemas:
 *     SubjectClass:
 *       type: object
 *       properties:
 *          id:
 *            type: string
 *            description: id
 *            example: CNPM01
 *          subject_id:
 *            type: string
 *            description: subject_id
 *            example: CNPM
 *          lecturer_id:
 *            type: string
 *            description: lecturer_id
 *            example: GV0001
 *          schedule_id:
 *            type: string
 *            description: schedule_id
 *            example: ca1
 *          class_name:
 *            type: string
 *            description: class_name
 *            example: CNPM01
 *          student_list:
 *            type: array
 *            description: student list
 *            items:
 *              $ref: '#/components/schemas/SubjectClassToCreate'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SubjectClassToCreate:
 *       type: object
 *       properties:
 *          id:
 *            type: string
 *            description: id
 *            example: CNPM01
 *          subject_id:
 *            type: string
 *            description: subject_id
 *            example: CNPM
 *          lecturer_id:
 *            type: string
 *            description: lecturer_id
 *            example: GV0001
 *          schedule_id:
 *            type: string
 *            description: schedule_id
 *            example: ca1
 *          class_name:
 *            type: string
 *            description: class_name
 *            example: CNPM01
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     StudentCodeAndNameList:
 *       type: object
 *       properties:
 *          student_code:
 *            type: string
 *            description: id
 *            example: CT050413
 *          first_name:
 *            type: string
 *            description: first_name
 *            example: Hoang Van 
 *          last_name:
 *            type: string
 *            description: last_name
 *            example: Giang
 *          class_name:
 *            type: string
 *            description: class_name
 *            example: CT5D
 */

/**
 * @swagger
 * /subjectClass/all:
 *   get:
 *     security:
 *        - bearerAuth: []
 *     tags:
 *        - SubjectClass
 *     summary: Get all Subject Classes
 *     description: Get all Subject Classes
 *     responses:
 *        200:
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/SubjectClass'
 *        404:
 *          description: No SubjectClass found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: No SubjectClass found
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
//get All subject class 
router.get('/all', auth.isAuth, async (req, res) => {
    try {
        const result = await controller.getSubjectClassList();

        if (result && result.length > 0) {
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
 * /subjectClass/{id}:
 *   get:
 *     security:
 *        - bearerAuth: []
 *     tags:
 *        - SubjectClass
 *     summary: Get subject class by id
 *     description: Get subject class by id
 *     responses:
 *        200:
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                items:
 *                  $ref: '#/components/schemas/SubjectClass'
 *        404:
 *          description: No SubjectClass found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: No SubjectClass found
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
        const id = req.params.id;
        const result = await controller.getSubjectClassById(id);

        if (result === '404') { // No studentClass found
            return res.status(404).json({ msg: 'No studentClass found' });
        } else if (result && result.length > 0) {
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
 * /subjectClass:
 *   get:
 *     security:
 *        - bearerAuth: []
 *     tags:
 *        - SubjectClass
 *     summary: Get subject class of a student
 *     description: Get subject class of a student
 *     responses:
 *        200:
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                items:
 *                  $ref: '#/components/schemas/SubjectClass'
 *        404:
 *          description: No SubjectClass found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: No SubjectClass found
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
router.get('/', auth.isAuth, async (req, res) => {
    try {
        var result;
        const role_name = req.user.role_name;
        if (role_name !== 'student') {
            result = await controller.getSubjectClassList();
        } else {
            const uid = req.user.uid;
            const student = await studentController.getStudent(uid);

            if (!student) {
                return res.status(400).json({ msg: 'Bad request' });
            }

            result = await controller.getSubjectClassByStudent(student);
        }

        if (result === '404') { // No studentClass found
            return res.status(404).json({ msg: 'No studentClass found' });
        } else if (result && result.length > 0) {
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


module.exports = router;

