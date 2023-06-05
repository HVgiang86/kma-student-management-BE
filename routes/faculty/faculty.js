var express = require('express');
var router = express.Router();
var controller = require('../../controllers/faculty/faculty');
const auth = require('../../middleware/authMiddleware');


/**
 * @swagger
 * components:
 *   schemas:
 *     Faculty:
 *       type: object
 *       properties:
 *          id:
 *            type: string
 *            description: uid
 *            example: khoa01
 *          faculty_name:
 *            type: string
 *            description: first_name
 *            example: Cơ bản
 */


/**
 * @swagger
 * /faculty:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all faculities 
 *     description: Get all faculities
 *     responses:
 *       200:
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Faculty'
 *       404:
 *          description: No Faculty Found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: No Account Found
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

router.get('/', auth.isAuth, async function (req, res, next) {
    console.log("GET /faculty");
    try {
        const result = await controller.getFacultyList();

        if (result && result.length > 0) {
            res.status(200).send(JSON.stringify(result, null, 4));
        } else {
            msg = { msg: "No Faculty Found" }
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
 * /faculty/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get faculty info by id  
 *     description: Get faculty info by id. Cay vcđ. API này đang không biết documenting kiểu gì :)) Hiểu đơn giản là nó là tham số trong URL
 *     responses:
 *       200:
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Faculty'
 *       404:
 *          description: No Faculty Found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: No Account Found
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

router.get('/:id', auth.isAuth, async function (req, res, next) {
    console.log("GET /faculty/:id");
    try {

        const faculty_id = req.params.id;

        const result = await controller.getFacultyById(faculty_id);

        if (result) {
            res.status(200).send(JSON.stringify(result, null, 4));
            return;
        }
        msg = { msg: "No Faculty Found" }
        res.status(404).send(JSON.stringify(msg, null, 4));

    } catch (err) {
        console.log('An error occurred:', err);
        msg = { msg: "Internal server error" }
        res.status(500).send(JSON.stringify(msg, null, 4));
    }
});

/**
 * @swagger
 * /faculty:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update a fuculity
 *     description: Update a fuculity
 *     requestBody:
 *       required: true
 *       content: 
 *          application/json:
 *              schema:
 *                $ref: '#/components/schemas/Faculty'
 *                  
 * 
 *     responses:
 *       200:
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Faculty'
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
 *          description: No Faculty Found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: No Account Found
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
router.put('/', auth.isAuth, async function (req, res, next) {
    console.log("PUT /faculty");
    try {
        if (req.user.role_name !== 'admin') {
            msg = { msg: "Unauthorized. Forbidden" }
            res.status(403).send(JSON.stringify(msg, null, 4));
            return;
        }

        const id = req.body.id
        const faculty_name = req.body.faculty_name

        const faculty = { id: id, faculty_name: faculty_name }

        const result = await controller.update(faculty);
        if (result) {
            res.status(200).send(JSON.stringify(result, null, 4));
        } else {
            msg = { msg: "No Faculty Found" }
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
 * /faculty:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a fuculity
 *     description: Create a fuculity
 *     requestBody:
 *       required: true
 *       content: 
 *          application/json:
 *              schema:
 *                $ref: '#/components/schemas/Faculty'
 *                  
 * 
 *     responses:
 *       200:
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Faculty'
 *       400:
 *          description: Faculty ID already exists
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Faculty ID already exists
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
router.post('/', auth.isAuth, async function (req, res, next) {
    console.log("POST /faculty");
    try {
        if (req.user.role_name !== 'admin') {
            msg = { msg: "Unauthorized. Forbidden" }
            res.status(403).send(JSON.stringify(msg, null, 4));
            return;
        }

        const id = req.body.id
        const faculty_name = req.body.faculty_name
        const faculty = { id: id, faculty_name: faculty_name }

        const result = await controller.create(faculty);
        if (result) {
            res.status(200).send(JSON.stringify(result, null, 4));
        } else {
            msg = { msg: "Faculty ID already exists" }
            res.status(400).send(JSON.stringify(msg, null, 4));
        }

    } catch (err) {
        console.log('An error occurred:', err);
        msg = { msg: "Internal server error" }
        res.status(500).send(JSON.stringify(msg, null, 4));
    }
});

/**
 * @swagger
 * /faculty:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a fuculity by id
 *     description: Delete a fuculity by id
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                  example: khoa01
 *     responses:
 *       200:
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Faculty'
 *       400:
 *          description: Bad Request. Has lectures belonging to this faculty?
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Bad Request. Has lectures belonging to this faculty?
 *       404:
 *          description: No Faculty Found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: No Faculty Found
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
router.delete('/', auth.isAuth, async function (req, res, next) {
    console.log("DELETE /faculty");
    try {
        if (req.user.role_name !== 'admin') {
            msg = { msg: "Unauthorized. Forbidden" }
            res.status(403).send(JSON.stringify(msg, null, 4));
            return;
        }

        const id = req.body.id

        const result = await controller.deleteById(id);

        if (result === '400') {
            msg = { msg: "Bad Request. Has lectures or majors belonging to this faculty?" }
            res.status(400).send(JSON.stringify(msg, null, 4));
            return;
        } else if (result === '200') {
            msg = { msg: "Deleted successfully" }
            res.status(200).send(JSON.stringify(msg, null, 4));
        } else if (result === '404') {
            msg = { msg: "No Faculty Found" }
            res.status(404).send(JSON.stringify(msg, null, 4));
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

/**
 * @swagger
 * /faculty/{id}/major:
 *   get:
 *     security:
 *        - bearerAuth: []
 *     summary: Get all majors of faculty
 *     description: Get all majors of faculty
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
// Lấy danh sách ngành thuộc khoa
router.get('/:id/major', auth.isAuth, async function (req, res, next) {
    console.log("GET /faculty/:id/major");
    try {
        const faculty_id = req.params.id;

        const result = await controller.getMajorListByFacultyId(faculty_id);

        if (result && result.length > 0) {
            res.status(200).send(JSON.stringify(result, null, 4));
        } else {
            msg = { msg: "No Major Found" }
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
 * /faculty/{id}/lecturer:
 *   get:
 *     security:
 *        - bearerAuth: []
 *     summary: Get all lecturers of faculty
 *     description: Get all lecturers of faculty
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
 *          description: Lecturer not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Lecturer not found
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
// Lấy danh sách giảng viên thuộc khoa
router.get('/:id/lecturer', auth.isAuth, async function (req, res, next) {
    console.log("GET /faculty/:id/lecturer");
    try {
        const faculty_id = req.params.id;

        const result = await controller.getLecturerListByFacultyId(faculty_id);

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
 * /faculty/{id}/student:
 *   get:
 *     security:
 *        - bearerAuth: []
 *     summary: Get all students of faculty
 *     description: Get all students of faculty
 *     responses:
 *        200:
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Student'
 *        404:
 *          description: Student not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: Student not found
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
// Lấy danh sách sinh viên thuộc khoa
router.get('/:id/student', auth.isAuth, async function (req, res, next) {
    console.log("GET /faculty/:id/student");
    try {
        const faculty_id = req.params.id;

        const result = await controller.getStudentListByFacultyId(faculty_id);

        if (result && result.length > 0) {
            res.status(200).send(JSON.stringify(result, null, 4));
        } else {
            msg = { msg: "No Student Found" }
            res.status(404).send(JSON.stringify(msg, null, 4));
        }
    } catch (err) {
        console.log('An error occurred:', err);
        msg = { msg: "Internal server error" }
        res.status(500).send(JSON.stringify(msg, null, 4));
    }
});


module.exports = router;