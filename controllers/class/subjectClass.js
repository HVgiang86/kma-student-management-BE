const SubjectClass = require('../../models/subjectClass');
const SubjectStudentClass = require('../../models/subjectStudentClass');
const Student = require('../../models/student');
const User = require('../../models/user');

async function getSubjectClassInfo(subjectClass) {
    try {
        const s = subjectClass;
        const id = s.id;
        const subject_id = s.subject_id;
        const lecturer_id = s.lecturer_id;
        const schedule_id = s.schedule_id;
        const class_name = s.class_name;

        const studentList = [];

        console.log('id: ', s.id)
        const studentSubjectClass = await SubjectStudentClass.findAll({ where: { subject_class_id: s.id } });
        console.log("studentSubjectClass: " + JSON.stringify(studentSubjectClass, null, 4));
        for (const ssc of studentSubjectClass) {
            const studentId = ssc.student_id;
            const student = await Student.findByPk(studentId);
            const user = await User.findByPk(student.uid);
            const studentObj = {
                student_code: studentId,
                first_name: user.first_name,
                last_name: user.last_name,
                class_name: student.class_id
            }
            studentList.push(studentObj);
        }

        const resultObject = {
            id: id,
            subject_id: subject_id,
            lecturer_id: lecturer_id,
            schedule_id: schedule_id,
            class_name: class_name,
            student_list: studentList
        }

        return resultObject;
    } catch (err) {
        console.log("An error occurred: " + err);
        throw new Error(err);
    }
}

Controller = {
    getSubjectClassInfo: async (subjectClass) => {
        try {
            const s = subjectClass;
            const id = s.id;
            const subject_id = s.subject_id;
            const lecturer_id = s.lecturer_id;
            const schedule_id = s.schedule_id;
            const class_name = s.class_name;

            const studentList = [];

            const studentSubjectClass = await SubjectStudentClass.findAll({ where: { subject_class_id: s.id } });
            console.log("studentSubjectClass: " + JSON.stringify(studentSubjectClass, null, 4));
            for (const ssc of studentSubjectClass) {
                const studentId = ssc.student_id;
                const student = await Student.findByPk(studentId);
                const user = await User.findByPk(student.uid);
                const studentObj = {
                    student_code: studentId,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    class_name: student.class_id
                }
                studentList.push(studentObj);
            }

            const resultObject = {
                id: id,
                subject_id: subject_id,
                lecturer_id: lecturer_id,
                schedule_id: schedule_id,
                class_name: class_name,
                student_list: studentList
            }

            return resultObject;
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    }
    ,
    create: async (subjectClass) => {

    },
    getSubjectClassByStudent: async (student) => {
        try {
            console.log("Student: " + JSON.stringify(student, null, 4));
            const id = student.student_code;
            const subjectStudentClass = await SubjectStudentClass.findAll({ where: { student_id: id } });
            const result = [];

            for (const ssc of subjectStudentClass) {
                const subjectClass = await SubjectClass.findByPk(ssc.subject_class_id);

                const resultObject = await getSubjectClassInfo(subjectClass);
                result.push(resultObject);
            }

            console.log("Controller: Get subject class list: " + JSON.stringify(result, null, 4));
            return result;
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },
    getSubjectClassById: async (id) => {
        try {
            const subjectClass = await SubjectClass.findByPk(id);

            const resultObject = await getSubjectClassInfo(subjectClass);

            console.log("Controller: Get subject class list: " + JSON.stringify(result, null, 4));
            return resultObject;
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },
    getSubjectClassList: async () => {
        try {
            const subjectClass = await SubjectClass.findAll();
            const result = [];

            for (const s of subjectClass) {

                const resultObject = await getSubjectClassInfo(s);
                result.push(resultObject);
            }

            console.log("Controller: Get subject class list: " + JSON.stringify(result, null, 4));
            return result;
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },

};
module.exports = Controller;