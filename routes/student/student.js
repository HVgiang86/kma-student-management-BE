var express = require('express');
var router = express.Router();
const controller = require('../../controllers/student/student');
const auth = require('../../middleware/authentication');

/**
 * @swagger
 * components:
 *   schemas:
 *     ToCreateStudent:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: email
 *         password:
 *           type: string
 *           description: password
 *         student_code:
 *           type: string
 *           description: student_code
 *         class_id:
 *           type: string
 *           description: class_id
 *         major_id:
 *           type: integer
 *           description: major_id
 *         year_of_admission:
 *           type: integer
 *           description: year_of_admission
 *         graduation_year:
 *           type: integer
 *           description: graduation_year
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
 *         nation:
 *           type: string
 *           description: nation
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
 *       example:
 *         email: "student@gmail.com"
 *         password: "password"
 *         student_code: "CT050413"
 *         class_id: "CT5D"
 *         major_id: 1
 *         year_of_admission: 2020
 *         graduation_year: 2025
 *         first_name: "Hoang Van"
 *         last_name: "Giang"
 *         gender: "male"
 *         date_of_birth: "1999-01-01"
 *         citizen_id: "123456789"
 *         nation: "Kinh"
 *         religion: "Không"
 *         nationality: "Vietnam"
 *         phone_number: "123456789"
 *         address: "123 Nguyen Van Linh"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ToUpdateStudent:
 *       type: object
 *       properties:
 *         uid:
 *           type: string
 *           description: student_code
 *         student_code:
 *           type: string
 *           description: student_code
 *         class_id:
 *           type: string
 *           description: class_id
 *         major_id:
 *           type: integer
 *           description: major_id
 *         year_of_admission:
 *           type: integer
 *           description: year_of_admission
 *         graduation_year:
 *           type: integer
 *           description: graduation_year
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
 *         nation:
 *           type: string
 *           description: nation
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
 *       example:
 *         uid: "uid string"
 *         student_code: "CT050413"
 *         class_id: "CT5D"
 *         major_id: 1
 *         year_of_admission: 2020
 *         graduation_year: 2025
 *         email: "email@gmail.com"
 *         first_name: "Hoang Van"
 *         last_name: "Giang"
 *         gender: "male"
 *         date_of_birth: "08/06/2002"
 *         citizen_id: "123456789"
 *         nation: "Kinh"
 *         religion: "Không"
 *         nationality: "Vietnam"
 *         phone_number: "0123456789"
 *         address: "123 Nguyen Van Linh"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     DisplayStudent:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: email
 *         student_code:
 *           type: string
 *           description: student_code
 *         class_id:
 *           type: string
 *           description: class_id
 *         major_id:
 *           type: integer
 *           description: major_id
 *         year_of_admission:
 *           type: integer
 *           description: year_of_admission
 *         graduation_year:
 *           type: integer
 *           description: graduation_year
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
 *         nation:
 *           type: string
 *           description: nation
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
 *           example: student
 *       example:
 *         email: "email@gmail.com"
 *         password: "password"
 *         first_name: "Hoang Van"
 *         last_name: "Giang"
 *         gender: "male"
 *         date_of_birth: "1999-01-01"
 *         citizen_id: "123456789"
 *         nation: "Kinh"
 *         religion: "Không"
 *         nationality: "Vietnam"
 *         phone_number: "123456789"
 *         address: "123 Nguyen Van Linh"
 *         role: "student"
 */

/**
 * @swagger
 * /student/all:
 *   get:
 *     security:
 *        - bearerAuth: []
 *     tags:
 *        - Student
 *     summary: Get all students
 *     description: Get all students
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
 *          description: No Student Found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: No student found
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
//get all students account
router.get('/all', auth.isAuth, async function (req, res) {
    console.log('/GET student/all');
    try {
        const result = await controller.getStudentList();
        if (result && result.length > 0) {
            res.status(200).send(JSON.stringify(result, null, 4));
        } else {
            msg = { msg: "No student found" }
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
 * /student:
 *   get:
 *     security:
 *        - bearerAuth: []
 *     tags:
 *        - Student
 *     summary: Get student information
 *     description: Get student information
 *     responses:
 *        200:
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                items:
 *                  $ref: '#/components/schemas/DisplayStudent'
 *        400:
 *          description: No Student Found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: No student found
 *        404:
 *          description: No Student Found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: No student found
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
    console.log('/GET student');
    try {
        const requestedUserId = req.user.uid;
        if (req.user.role_name !== 'student') {
            msg = { msg: "Bad Request. Not a student" }
            res.status(400).send(JSON.stringify(msg, null, 4));
            return;
        }

        const result = await controller.getStudent(requestedUserId);
        if (result) {
            res.status(200).send(JSON.stringify(result, null, 4));
        } else {
            msg = { msg: "No student found" }
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
 * /student/{id}:
 *   get:
 *     security:
 *        - bearerAuth: []
 *     tags:
 *        - Student
 *     summary: Get student information by student_code
 *     description: Get student information by student_code
 *     responses:
 *        200:
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                items:
 *                  $ref: '#/components/schemas/DisplayStudent'
 *        400:
 *          description: No Student Found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: No student found
 *        404:
 *          description: No Student Found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: No student found
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
    console.log('/GET student');
    try {
        const student_code = req.params.id;
        if (req.user.role_name !== 'admin') {
            msg = { msg: "Bad Request. Forbidened" }
            res.status(400).send(JSON.stringify(msg, null, 4));
            return;
        }

        const result = await controller.getStudentByStudentCode(student_code);
        if (result) {
            res.status(200).send(JSON.stringify(result, null, 4));
        } else {
            msg = { msg: "No student found" }
            res.status(404).send(JSON.stringify(msg, null, 4));
        }
    } catch (err) {
        console.log('An error occurred:', err);
        msg = { msg: "Internal server error" }
        res.status(500).send(JSON.stringify(msg, null, 4));
    }
});

//lấy danh sách các môn của sv
router.get('/:id/subject', auth.isAuth, async function (req, res) {

});

//lấy bảng điểm của sv
router.get('/:id/score', auth.isAuth, async function (req, res) { });

//Lấy thông tin cá nhân qua id
router.get('/:id/', auth.isAuth, async function (req, res) { });

//Lay lich hoc cua sv
router.get('/:id/schedule', auth.isAuth, async function (req, res) { });


/**
 * @swagger
 * /student:
 *   put:
 *     security:
 *        - bearerAuth: []
 *     tags:
 *        - Student
 *     summary: Update a student account
 *     description: Update a student account
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ToUpdateStudent'
 *     responses:
 *        200:
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/DisplayStudent'
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
 *          description: No Student Found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: No student found
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
//update information
router.put('/', auth.isAuth, async function (req, res) {
    console.log('/PUT student');
    try {
        if (!(req.user.role_name === 'admin' || requestedUserId === req.body.uid)) {
            msg = { msg: "Unauthorized. Forbidden" }
            res.status(403).send(JSON.stringify(msg, null, 4));
            return;
        }

        const uid = req.body.uid;
        const id = req.body.student_code;
        const class_id = req.body.class_id;
        const major_id = req.body.major_id;
        const year_of_admission = req.body.year_of_admission;
        const graduation_year = req.body.graduation_year;
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const gender = req.body.gender;
        const date_of_birth = req.body.date_of_birth;
        const citizen_id = req.body.citizen_id;
        const nation = req.body.nation;
        const religion = req.body.religion;
        const nationality = req.body.nationality;
        const phone_number = req.body.phone_number;
        const address = req.body.address;

        const student = {
            id: id,
            uid: uid,
            class_id: class_id,
            major_id: major_id,
            year_of_admission: year_of_admission,
            graduation_year: graduation_year,

        }

        const user = {
            uid: uid,
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number,
            address: address,
            date_of_birth: date_of_birth,
            citizen_id: citizen_id,
            religion: religion,
            nationality: nationality,
            gender: gender,
            role_name: 'student',
            nation: nation
        }

        //justify
        for (let key in student) {
            if (student[key] === undefined) {
                student[key] = "";
            }
        }

        if (user.uid.length == 0 || user.first_name.length == 0 || user.last_name.length == 0 || student.id.length == 0) {
            res.status(400).send(JSON.stringify("Invalid input", null, 4));
            return;
        }

        const result = await controller.update(student, user);
        if (result) {
            const display = controller.displayStudentWithoutPassword(result);
            res.status(200).send(JSON.stringify(display, null, 4));
        } else {
            msg = { msg: "No student found" }
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
 * /student:
 *   post:
 *     tags:
 *        - Student
 *     summary: Create a new student account
 *     description: Create a new student account
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ToCreateStudent'
 *     responses:
 *        200:
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/DisplayStudent'
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
 *          description: Student code or email already exists
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Student code or email already exists
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
//create new student account
router.post('/', async function (req, res) {
    console.log('/POST student');
    try {

        const email = req.body.email
        const password = req.body.password
        const id = req.body.student_code
        const class_id = req.body.class_id
        const major_id = req.body.major_id
        const year_of_admission = req.body.year_of_admission
        const graduation_year = req.body.graduation_year
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const phone_number = req.body.phone_number;
        const address = req.body.address;
        const date_of_birth = req.body.date_of_birth;
        const citizen_id = req.body.citizen_id;
        const religion = req.body.religion;
        const nationality = req.body.nationality;
        const gender = req.body.gender;
        const role_name = 'student';
        const nation = req.body.nation;

        const student = {
            id: id,
            uid: '',
            class_id: class_id,
            major_id: major_id,
            year_of_admission: year_of_admission,
            graduation_year: graduation_year,

        }

        const user = {
            email: email,
            password: password,
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number,
            address: address,
            date_of_birth: date_of_birth,
            citizen_id: citizen_id,
            religion: religion,
            nationality: nationality,
            gender: gender,
            role: role_name,
            nation: nation
        }

        //justify
        for (let key in student) {
            if (student[key] === undefined) {
                student[key] = "";
            }
        }

        if (user.email.length == 0 || user.password.length == 0 || user.first_name.length == 0 || user.last_name.length == 0 || student.id.length == 0 || user.gender.length == 0) {
            msg = { msg: "Invalid input" }
            res.status(400).send(JSON.stringify(msg, null, 4));
            return;
        }

        const result = await controller.create(student, user);
        if (result) {
            res.status(200).send(JSON.stringify(result, null, 4));
        } else {
            msg = { msg: "Student code or email already exists" }
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
 * /student:
 *   delete:
 *     security:
 *        - bearerAuth: []
 *     tags:
 *        - Student
 *     summary: Delete a student by student_code
 *     description: Delete a student by student_code
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                student_code:
 *                  type: string
 *                  example: CT050410
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
 *                    example: Deleted student with student_code 
 *        404:
 *          description: No Student Found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: No Student Found
 *        409:
 *          description:  Cannot delete student. That student has scores or student_subject_class not be deleted
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Cannot delete student. That student has scores or student_subject_class not be deleted
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
//delete a student account
router.delete('/', auth.isAuth, async function (req, res) {
    try {

        const id = req.body.student_code;
        if (req.user.role_name !== 'admin') {
            msg = { msg: "Unauthorized. Forbidden" }
            res.status(403).send(JSON.stringify(msg, null, 4));
            return;
        }

        const result = await controller.delete(id);

        if (result === '404') {
            msg = { msg: "No student found" }
            res.status(404).send(JSON.stringify(msg, null, 4));
            return;
        } else if (result === '409') {
            msg = { msg: "Cannot delete student. That student has scores or student_subject_class not be deleted" };
            res.status(409).send(JSON.stringify(msg, null, 4));
            return;
        } else if (result === '200') {
            msg = { msg: `Deleted student with student_code ${id}` }
            res.status(200).send(JSON.stringify(msg, null, 4));
            return;
        } else {
            msg = { msg: "Internal server error" }
            res.status(500).send(JSON.stringify(msg, null, 4));
            return;
        }


    } catch (err) {
        console.log('An error occurred:', err);
        msg = { msg: "Internal server error" }
        res.status(500).send(JSON.stringify(msg, null, 4));
    }
});



module.exports = router;