const User = require('../models/user');
const Crypto = require('../utils/crypto');


LoginController = {
    login: async (email, password) => {
        console.log(`password: ${password}`)

        try {
            const user = await User.findOne({ where: { email: email } })

            if (!user) {
                return null;
            }
            console.log(`user: ${JSON.stringify(user, null, 4)}`)
            var userHashedPassword = user.hashed_password;
            console.log(`userHashedPassword: ${JSON.stringify(userHashedPassword, null, 4)}`)
            const isPasswordCorrect = await Crypto.comparePassword(password, userHashedPassword);

            if (!isPasswordCorrect) {
                console.log("Password incorrect")
                return null;
            }

            return user;
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }

    }
}

module.exports = LoginController;