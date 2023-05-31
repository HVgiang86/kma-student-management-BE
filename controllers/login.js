const User = require('../models/userModel');
const Crypto = require('../utils/crypto');


LoginController = {
    login: async (email, password) => {
        console.log(`password: ${password}`)
        var hashed_password = await Crypto.hash(password);

        try {
            const user = await User.findOne({ where: { email: email } })

            if (!user) {
                return null;
            }
            console.log(`user: ${JSON.stringify(user, null, 4)}`)
            var userHashedPassword = await Crypto.hash(user.hashed_password);
            console.log(`userHashedPassword: ${JSON.stringify(userHashedPassword, null, 4)}`)
            console.log(`hashed_password: ${JSON.stringify(hashed_password, null, 4)}`)
            const isPasswordCorrect = await Crypto.comparePassword(userHashedPassword,hashed_password);

            if (!isPasswordCorrect) {
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