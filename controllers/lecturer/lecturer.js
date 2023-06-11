const Lecturer = require('../../models/lecturer');
const Faculty = require('../../models/faculty');
const SubjectClass = require('../../models/subjectClass');

lecturerController = {
    create: async (lecturer) => {
        try {
            var id = lecturer.id;
            var faculty_id = lecturer.faculty_id;
            var lecturer_name = lecturer.lecturer_name;

            const result = await Lecturer.findOne({ where: { id: id } })

            if (result) {
                console.log("Lecturer id already exists - Controller")
                return '409';
            }

            const faculty = await Faculty.findByPk(faculty_id);

            if (!faculty) {
                return '404';
            }

            var newLecturer = null;
            await Lecturer.create({ id: id, faculty_id: faculty_id, lecturer_name: lecturer_name }).then(lecturer => {
                newLecturer = lecturer;
                console.log("Controller: Create lecturer: " + JSON.stringify(newLecturer, null, 4));
            }).catch(err => {
                console.error('Controller: Unable to create lecturer:', err);
                throw new Error(err);
            });

            return newLecturer;
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },
    getLecturerList: async () => {
        try {
            const result = await Lecturer.findAll();
            console.log("Controller: Get lecturer list: " + JSON.stringify(result, null, 4));
            return result;
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },
    getLecturer: async (id) => {
        try {
            const result = await Lecturer.findByPk(id);
            console.log("Controller: Get lecturer list: " + JSON.stringify(result, null, 4));
            return result;
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },
    update: async (lecturer) => {
        try {
            const id = lecturer.id;
            const faculty_id = lecturer.faculty_id;

            const lecturerToUpdate = await Lecturer.findByPk(id);

            if (!lecturerToUpdate)
                return '404';

            const  faculty = await Faculty.findByPk(faculty_id);

            if (!faculty)
                return '409';

            const result = await lecturerToUpdate.update(lecturer);

            return result;
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },
    delete: async (id) => {
        try {
            const lecturer = await Lecturer.findByPk(id);

            if (!lecturer)
                return '404';

            const num1 = (await Faculty.findAll({ where: { id: lecturer.faculty_id } })).length;
            const num2 = (await SubjectClass.findAll({ where: { lecturer_id: id } })).length;

            if (num1 > 0 || num2 > 0)
                return '409';

            await Lecturer.destroy({ where: { id: id } });

            return '200';
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },
    getSubjectClassByLecturer: async (id) => {
        try {
            const result = await SubjectClass.findAll({ where: { lecturer_id: id } });
            console.log("Controller: Get subject class by lecturer: " + JSON.stringify(result, null, 4));
            return result;
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    }
};
module.exports = lecturerController;