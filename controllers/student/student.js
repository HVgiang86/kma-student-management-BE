const Student = require('../../models/student');
const UserController = require('../../controllers/users/users');
const SubjectStudentClass = require('../../models/subjectStudentClass');
const SubjectClass = require('../../models/subjectClass');
const StudentSubjectClass = require('../../models/subjectStudentClass');
//const Score = require('../../models/score');


function getDisplayableResult(student, user) {
    try {
        return {
            uid: user.uid,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            student_code: student.id,
            class_id: student.class_id,
            major_id: student.major_id,
            year_of_admission: student.year_of_admission,
            graduation_year: student.graduation_year,
            phone_number: user.phone_number,
            address: user.address,
            date_of_birth: user.date_of_birth,
            citizen_id: user.citizen_id,
            nation: user.nation,
            religion: user.religion,
            gender: user.gender,
            role_name: user.role_name,
            nationality: user.nationality
        }
    } catch (err) {
        console.log("An error occurred: " + err);
        throw new Error(err);
    }
}

StudentController = {
    create: async (student, user) => {
        try {
            const studentCheck = await Student.findByPk(student.id);

            if (studentCheck) {
                console.log("Student ID already exists - Controller")
                return null;
            }

            const userCheck = await UserController.create(user);

            if (userCheck) {
                student.uid = userCheck.uid;
                var newStudent = await Student.create(student).then((student1) => {
                    console.log("Controller: Created student: " + JSON.stringify(student1, null, 4));
                    newStudent = student1;
                }).catch(err => {
                    console.error('Controller: Unable to create student:', err);
                    throw new Error(err);
                });

                return getDisplayableResult(student, userCheck);
            } else {
                console.log("Unable to create user - Controller");
                return null;
            }

        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },

    getStudent: async (uid) => {
        try {
            const student = await Student.findOne({ where: { uid: uid } });
            console.log("Controller: Get student: " + JSON.stringify(student, null, 4));
            const user = await UserController.getUserInfo(uid);

            const result = getDisplayableResult(student, user);
            console.log("Controller: Get student: " + JSON.stringify(result, null, 4));
            return result;
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },
    getStudentByStudentCode: async (id) => {
        try {
            const student = await Student.findByPk(id);

            if (!student) { 
                return null;
            }

            console.log("Controller: Get student: " + JSON.stringify(student, null, 4));
            const uid = student.uid;
            const user = await UserController.getUserInfo(uid);

            if (!user)
                return null;

            const result = getDisplayableResult(student, user);
            console.log("Controller: Get student: " + JSON.stringify(result, null, 4));
            return result;
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },
    update: async (student, user) => {
        try {
            const studentToUpdate = await Student.findOne({ uid: student.uid });

            if (!studentToUpdate) {
                console.log("Student not found - Controller")
                return null;
            }

            const userToUpdate = await UserController.updateUser(user);

            if (!userToUpdate) {
                return null;
            }

            const result = await studentToUpdate.update(student);
            return getDisplayableResult(result, userToUpdate);
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },

    delete: async (id) => {
        try {
            const student = await Student.findByPk(id)
            if (!student)
                return '404';

            const num1 = (await SubjectStudentClass.findAll({ where: { student_id: id } })).length;
            //const num2 = (await Score.findAll({ where: { student_id: id } })).length;

            console.log(num1);
            if (num1 > 0) {
                return '409';
            }

            //console.log(num2)

            // if (num2 > 0) {
            //     return '409';
            // }

            const result = await student.destroy();

            if (!result)
                return '500';

            const user = await UserController.deleteByUid(student.uid);

            if (!user)
                return '404';


            return '200';

        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },
    getStudentList: async () => {
        try {
            const resultList = [];
            var studentList = await Student.findAll();

            for (const student of studentList) {
                const uid = student.uid;
                const user = await UserController.getUserInfo(uid);
                const result = getDisplayableResult(student, user);
                resultList.push(result);
            }
            console.log("Controller: Get student list: " + JSON.stringify(resultList, null, 4));
            return resultList;
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },
    displayStudentWithoutPassword: (student) => {
        try {
            return {
                uid: student.uid,
                first_name: student.first_name,
                last_name: student.last_name,
                email: student.email,
                student_code: student.student_code,
                class_id: student.class_id,
                major_id: student.major_id,
                year_of_admission: student.year_of_admission,
                graduation_year: student.graduation_year,
                phone_number: student.phone_number,
                address: student.address,
                date_of_birth: student.date_of_birth,
                citizen_id: student.citizen_id,
                nation: student.nation,
                religion: student.religion,
                nationality: student.nationality,
                gender: student.gender,
                role_name: student.role_name
            }
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },
    getStudentSubjectListById: async (id) => { 
        try {
            const student = await Student.findByPk(id);
            if (!student)
                return '404';
            
            const subjectList = await StudentSubjectClass.findAll({ where: { student_id: id } });

            
            
            return subjectList;
        } catch (err) { 
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    }

};

module.exports = StudentController;