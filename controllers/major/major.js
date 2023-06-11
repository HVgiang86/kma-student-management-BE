const Major = require('../../models/major');
const Student = require('../../models/student');

MajorController = {
    create: async (major) => {
        try {
            const faculty_id = major.faculty_id
            const major_name = major.major_name

            if (!faculty_id || !major_name)
                return null;

            var result = await Major.findOne({ where: { major_name: major_name } });

            if (result)
                return null;

            var newMajor = null;
            await Major.create({ major_name: major_name, faculty_id: faculty_id }).then(major => {
                console.log("Controller: Create major: " + JSON.stringify(major, null, 4));
                newMajor = major;
            }).catch(err => {
                console.error('Controller: Unable to create major:', err);
                throw err;
            });

            return newMajor;

        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },
    update: async (major) => {
        try {
            const id = major.id

            const majorToUpdate = await Major.findOne({ where: { id: id } });

            if (!majorToUpdate)
                return null;

            const result = majorToUpdate.update(subject);

            return result;
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },
    delete: async (id) => {
        try {
            const major = await Major.findByPk(id);
            if (!major)
                return '404';

            const num = (await Student.findAll({ where: { major_id: id } })).length;
            if (num !== 0) {
                console.log("Major has students");
                return '409';
            }

            const result = await major.destroy();

            if (result)
                return '200';
            else
                return '500';

        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },
    getMajorList: async () => {
        try {
            const result = await Major.findAll();
            console.log("Controller: Get Major list: " + JSON.stringify(result, null, 4));
            return result;
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },
    getStudentListByMajorId: async (id) => {
        try {
            const result = await Student.findAll({ where: { major_id: id } });
            console.log("Controller: Get student list: " + JSON.stringify(result, null, 4));
            return result;
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    }
};

module.exports = MajorController;