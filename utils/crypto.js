const bcrypt = require('bcryptjs');


Crypto = {
    hash: async (password) => {
        try {
            const saltRounds = 10;
            const hashed_password = await bcrypt.hash(password, saltRounds);
            return hashed_password;
        } catch (e) {
            console.log("An error occurred: " + e);
            throw new Error(e);
        }
    },
    comparePassword: async (password, hashed_password) => {
        try {
            return await bcrypt.compare(password, hashed_password);
        } catch (e) {
            console.log("An error occurred: " + e);
            throw new Error(e);
        }
    },

    genSalt: async () => {
        const saltRounds = 10;
        return await bcrypt.genSalt(saltRounds);
    },

}


module.exports = Crypto;
