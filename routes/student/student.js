var express = require('express');
var router = express.Router();
const controller = require('../../controllers/student/student');
const auth = require('../../middleware/authMiddleware');

router.get('/', auth.isAuth, async function (req, res) {

});

router.get('/all', auth.isAuth, async function (req, res) { });

router.get('/:id', auth.isAuth, async function (req, res) { });

//lấy danh sách các môn của sv
router.get('/:id/subject', auth.isAuth, async function (req, res) { });

//lấy bảng điểm của sv
router.get('/:id/score', auth.isAuth, async function (req, res) { });

//Lấy thông tin cá nhân qua id
router.get('/:id/', auth.isAuth, async function (req, res) { });

//Lay lich hoc cua sv
router.get('/:id/schedule', auth.isAuth, async function (req, res) { });



//update information
router.put('/', auth.isAuth, async function (req, res) { });

//create new student account
router.post('/', auth.isAuth, async function (req, res) { });

//delete a student account
router.delete('/', auth.isAuth, async function (req, res) { });



module.exports = router;