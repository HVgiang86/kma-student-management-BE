var express = require('express');
var router = express.Router();
const controller = require('../../controllers/users/users');



/* GET users listing. */
router.get('/', async function (req, res, next) {
  console.log("GET /users");
  try {
    const result = await controller.getUserList();
    if (result && result.length > 0) {
      res.status(200).send(JSON.stringify(result, null, 4));
    } else {
      msg = { msg: "No Account Found" }
      res.status(404).send(JSON.stringify(msg, null, 4));
    }
  } catch (err) {
    console.log('An error occurred:', err);
    msg = { msg: "Internal server error" }
    res.status(500).send(JSON.stringify(msg, null, 4));
  }

});

router.delete('/', async function (req, res, next) {
  console.log("DELETE /users");

  const uid = req.body.uid;


  try {
    const result = await controller.deleteByUid(uid);

    if (result) {
      msg = { msg: `Deleted user with uid: ${uid}` }
      res.status(200).send(JSON.stringify(msg, null, 4));
    } else {
      msg = { msg: "No Account Found" }
      res.status(404).send(JSON.stringify(msg, null, 4));
    }
  } catch (err) {
    console.log('An error occurred:', err);
    msg = { msg: "Internal server error" }
    res.status(500).send(JSON.stringify(msg, null, 4));
  }
});


router.put('/', async function (req, res, next) {
  console.log("PUT /users");
  const uid = req.body.uid;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const phone_number = req.body.phone_number;
  const address = req.body.address;
  const date_of_birth = req.body.date_of_birth;
  const citizen_id = req.body.citizen_id;
  const religion = req.body.religion;
  const nationality = req.body.nationality;
  const gender = req.body.gender;

  const user = {
    uid: uid, first_name: first_name, last_name: last_name, phone_number: phone_number, address: address, date_of_birth: date_of_birth, citizen_id: citizen_id,
    religion: religion, nationality: nationality, gender: gender
  }

  //justify
  for (let key in user) {
    if (user[key] === undefined) {
      user[key] = "";
    }
  }

  if (user.uid.length == 0  || user.first_name.length == 0 || user.last_name.length == 0)
    res.status(400).send(JSON.stringify("Invalid input", null, 4));

  try {
    const result = await controller.updateUser(user);

    if (result) {
      console.log("Updated user: " + JSON.stringify(result, null, 4));
      res.status(200).send(JSON.stringify(result, null, 4));

    } else {
      msg = { msg: "No Account Found" }
      res.status(404).send(JSON.stringify(msg, null, 4));
    }

  } catch (err) {
    console.log('An error occurred:', err);
    msg = { msg: "Internal server error" }
    res.status(500).send(JSON.stringify(msg, null, 4));
  }

});

router.post('/', async function (req, res, next) {
  console.log("POST /users");
  const email = req.body.email
  const password = req.body.password
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const phone_number = req.body.phone_number;
  const address = req.body.address;
  const date_of_birth = req.body.date_of_birth;
  const citizen_id = req.body.citizen_id;
  const religion = req.body.religion;
  const nationality = req.body.nationality;
  const gender = req.body.gender;
  const role = req.body.role;

  const user = {
    email: email, password: password, first_name: first_name, last_name: last_name, phone_number: phone_number, address: address, date_of_birth: date_of_birth, citizen_id: citizen_id,
    religion: religion, nationality: nationality, gender: gender, role: role
  }

  //justify
  for (let key in user) {
    if (user[key] === undefined) {
      user[key] = "";
    }
  }

  if (user.email.length == 0 || user.password.length == 0 || user.first_name.length == 0 || user.last_name.length == 0)
    res.status(400).send(JSON.stringify("Invalid input", null, 4));

  try {
    const result = await controller.create(user);
    console.log("result: " + result);

    if (result) {
      console.log("Created user: " + JSON.stringify(result, null, 4));
      res.status(200).send(JSON.stringify(result, null, 4));
    } else {
      console.log("router: Email already exists")
      msg = { msg: "Email already exists" }

      res.status(409).send(JSON.stringify(msg, null, 4));
    }
  } catch (err) {
    console.log('An error occurred:', err);
    msg = { msg: "Internal server error" }
    res.status(500).send(JSON.stringify(msg, null, 4));
  }

});

module.exports = router;
