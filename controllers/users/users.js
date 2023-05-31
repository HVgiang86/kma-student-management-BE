const User = require('../../models/userModel');
const Crypto = require('../../utils/crypto');
const { v4: uuidv4 } = require('uuid');

UserController = {
    create: async (user) => {
        const email = user.email
        const password = user.password
        const first_name = user.first_name;
        const last_name = user.last_name;
        const phone_number = user.phone_number;
        const address = user.address;
        const date_of_birth = user.date_of_birth;
        const citizen_id = user.citizen_id;
        const religion = user.religion;
        const nationality = user.nationality;
        const gender = user.gender;
        const role = user.role;

        try {
            const uuid = uuidv4(16);
            const uid = uuid.replace(/-/g, '').substring(0, 16);

            console.log("uid: " + uid);

            const result = await User.findOne({ where: { email: email } })

            if (result) {
                console.log("Email already exists - Controller")
                return null;
            }

            var newUser = null
            
            await User.create({
                uid: uid, email: email, hashed_password: password, first_name: first_name, last_name: last_name, phone_number: phone_number, address: address, date_of_birth: date_of_birth,
                citizen_id: citizen_id, religion: religion, nationality: nationality, gender: gender, role_name: role
            }).then(user => {
                console.log("Controller: Created user: " + JSON.stringify(user, null, 4));
                newUser = user;
            }).catch(err => {
                console.error('Controller: Unable to create user:', err);
                throw new Error(err);
            });

            return newUser

        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },

    getUserList: async () => {
        try {
            const result = await User.findAll();
            console.log("Controller: Get user list: " + JSON.stringify(result, null, 4));
            return result;
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },

    deleteByUid: async (uid) => {
        try {
            const number = await User.destroy({ where: { uid: uid } });

            if (number == 0) {
                return null;
            }
            return number;
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },

    updateUser: async (user) => {
        const uid = user.uid;

        try {
            console.log(`uid: ${user.uid}`)

            const userToUpdate = await User.findOne({ where: { uid: uid } });
            if (!userToUpdate) {
                console.log("User not found - Controller")
                return null;
            }

            user['email'] = userToUpdate['email']
            user['password'] = userToUpdate['password']
            user['role'] = userToUpdate['role']

            const result = await userToUpdate.update(user);
            console.log("Updated user: " + JSON.stringify(result, null, 4));

            return result;
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    }
}

module.exports = UserController;