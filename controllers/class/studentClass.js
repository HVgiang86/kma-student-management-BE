const StudentClass = require('../../models/studentClass');
const Student = require('../../models/student');
const StudentController = require('../student/student');

Controller = {
    getStudentClassList: async () => {
        try {
            const result = await StudentClass.findAll();

            return result;
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },
    getStudentClassById: async (id) => {
        try {
            const studentClass = await StudentClass.findByPk(id);

            if (!studentClass)
                return '404';

            const studentList = [];

            const students = await Student.findAll({ where: { class_id: id } });

            for (const student of students) {
                console.log("Student: " + JSON.stringify(student, null, 4));
                const studentToDisplay = await StudentController.getDisplayableStudent(student);
                studentList.push(studentToDisplay);
            }

            const result = {
                id: studentClass.id,
                class_name: studentClass.class_name,
                student_list: studentList
            }

            return result;
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },

    create: async (studentClass) => {
        try {
            var id = studentClass.id;

            const result = await StudentClass.findOne({ where: { id: id } })

            if (result) {
                console.log("Student Class ID already exists - Controller")
                return null;
            }

            var newClass = null;
            await StudentClass.create(studentClass).then(studentClass => {
                newClass = studentClass;
                console.log("Controller: Create faculty: " + JSON.stringify(newClass, null, 4));
            }).catch(err => {
                console.error('Controller: Unable to create faculty:', err);
                throw new Error(err);
            });

            return newClass;
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },
    update: async (oldName, newName) => {
        try {
            const studentClass = await StudentClass.findOne({ where: { class_name: oldName } });

            if (!studentClass)
                return '404';

            const newStudentCheck = await StudentClass.findOne({ where: { class_name: newName } });

            if (newStudentCheck)
                return '409';

            var newClass = {
                id: newName,
                class_name: newName
            }

            const result = await studentClass.update(newClass);

            return result;
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },
    deleteById: async (id) => {
        try {
            const studentClass = await StudentClass.findByPk(id);

            if (!studentClass)
                return '404';

            const num = (await Student.findAll({ where: { class_id: id } })).length;

            if (num > 0)
                return '409';

            await Student.destroy({ where: { class_id: id } });

            const result = await studentClass.destroy();

            if (result)
                return '200';
            else
                return '500';
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },
    addStudentToClass: async (student_code, class_name) => {
        try {
            const student = await Student.findOne({ where: { id: student_code } });
            if (!student)
                return '404';

            const studentClass = await StudentClass.findByPk(class_name);

            if (!studentClass)
                return '404';

            const result = await student.update({ class_id: class_name });

            if (result)
                return '200';
            else
                return '500';
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },
    removeStudentFromClass: async (student_code, class_name) => {
        try {
            const student = await Student.findOne({ where: { id: student_code } });
            if (!student)
                return '404';

            const studentClass = await StudentClass.findByPk(class_name);

            if (!studentClass)
                return '404';

            if (student.class_id != class_name) {
                return '409';
            }

            const result = await student.update({ class_id: 'N/A' });

            if (result)
                return '200';
            else
                return '500';
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    }
};
module.exports = Controller;