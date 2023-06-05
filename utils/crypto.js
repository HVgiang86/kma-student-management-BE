const argon2 = require('argon2');

Crypto = {
    hash: async (password) => {
        try {
            const hashedPassword = await argon2.hash(password);
            return hashedPassword;
        } catch (e) {
            console.log("An error occurred: " + e);
            throw new Error(e);
        }
    },
    comparePassword: async (password, hashed_password) => {
        try {
            return await argon2.verify(hashed_password, password);
        } catch (e) {
            console.log("An error occurred: " + e);
            throw new Error(e);
        }
    },

}


module.exports = Crypto;
