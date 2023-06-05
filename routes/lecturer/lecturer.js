var express = require('express');
var router = express.Router();
const controller = require('../../controllers/lecturer/lecturer');
const auth = require('../../middleware/authMiddleware');

router.get('/', auth.isAuth, async function (req, res) { });

router.get('/:id', auth.isAuth, async function (req, res) { });

router.put('/', auth.isAuth, async function (req, res) { });

router.post('/', auth.isAuth, async function (req, res) { });

router.delete('/', auth.isAuth, async function (req, res) { });

//Lay danh sach lop do giang vien day
router.get('/:id/subject_class', auth.isAuth, async function (req, res) { });



module.exports = router;