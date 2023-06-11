const Faculty = require('../../models/faculty');
const Lecturer = require('../../models/lecturer');
const Major = require('../../models/major');
const Student = require('../../models/student');

FacultyController = {
    getFacultyList: async () => {
        try {
            const result = await Faculty.findAll();
            console.log("Controller: Get faculty list: " + JSON.stringify(result, null, 4));
            return result;
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },
    getFacultyById: async (id) => {
        try {
            const result = await Faculty.findOne({ where: { id: id } });
            console.log("Controller: Get faculty: " + JSON.stringify(result, null, 4));
            return result;
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },
    create: async (faculty) => {
        try {
            var faculty_name = faculty.faculty_name;

            const result = await Faculty.findOne({ where: { faculty_name: faculty_name } })

            if (result) {
                console.log("Faculty ID already exists - Controller")
                return null;
            }

            var newFaculty = null;
            await Faculty.create({ faculty_name: faculty_name }).then(faculty => {
                newFaculty = faculty;
                console.log("Controller: Create faculty: " + JSON.stringify(newFaculty, null, 4));
            }).catch(err => {
                console.error('Controller: Unable to create faculty:', err);
                throw new Error(err);
            });

            return newFaculty;
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },
    deleteById: async (id) => {
        try {
            const faculty = await Faculty.findByPk(id);

            if (!faculty)
                return '404';

            const num1 = (await Lecturer.findAll({ where: { faculty_id: id } })).length;
            const num2 = (await Major.findAll({ where: { faculty_id: id } })).length;
            if (num1 !== 0 || num2 !== 0)
                return '400';

            const number = await faculty.destroy();
            if (!number)
                return '404';

            return '200';

        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },
    update: async (faculty) => {
        try {
            const id = faculty.id;
            const faculty_name = faculty.faculty_name;
            const toUpdate = await Faculty.findOne({ where: { id: id } })

            if (!toUpdate) {
                console.log("Faculty ID not exists - Controller")
                return null;
            }

            const result = await toUpdate.update({ id: id, faculty_name: faculty_name });

            return result;
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },
    getMajorListByFacultyId: async (id) => {
        try {
            const faculty = await Faculty.findOne({ where: { id: id } });

            if (!faculty)
                return '404';
            
            const result = await Major.findAll({ where: { faculty_id: id } });
            console.log("Controller: Get major list: " + JSON.stringify(result, null, 4));
            return result;
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },
    getLecturerListByFacultyId: async (id) => {
        try {
            const faculty = await Faculty.findOne({ where: { id: id } });

            if (!faculty)
                return '404';

            const result = await Lecturer.findAll({ where: { faculty_id: id } });
            console.log("Controller: Get lecturer list: " + JSON.stringify(result, null, 4));
            return result;
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },
    getStudentListByFacultyId: async (id) => {
        try {
            const faculty = await Faculty.findOne({ where: { id: id } });

            if (!faculty)
                return '404';
            
            const result = await Student.findAll({ where: { faculty_id: id } });
            console.log("Controller: Get student list: " + JSON.stringify(result, null, 4));
            return result;
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    }
};

module.exports = FacultyController;