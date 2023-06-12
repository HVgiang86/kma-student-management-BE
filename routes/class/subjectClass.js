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
 */

var express = require('express');
var router = express.Router();
var controller = require('../../controllers/class/subjectClass');
const auth = require('../../middleware/authentication');



module.exports = router;

