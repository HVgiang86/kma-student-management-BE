const Student = require('../../models/student');
const UserController = require('../../controllers/users/users');
const SubjectStudentClass = require('../../models/subjectStudentClass');
const SubjectClass = require('../../models/subjectClass');
const StudentSubjectClass = require('../../models/subjectStudentClass');
const Score = require('../../models/score');
const Subject = require('../../models/subject');
const Schedule = require('../../models/schedule');
const ScoreCaculator = require('../../controllers/score/scoreCaculator');
const Lecturer = require('../../models/lecturer');

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
    getDisplayableResult: (student, user) => {
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
    },

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

            await SubjectStudentClass.destroy({ where: { student_id: id } });
            await Score.destroy({ where: { student_id: id } });

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
    },
    getScoreListByStudentId: async (id) => {
        try {
            const student = await Student.findByPk(id);
            if (!student)
                return '404';

            const result = []
            const scoreList = await Score.findAll({ where: { student_id: id } });

            for (const s of scoreList) {
                const subject = await Subject.findByPk(s.subject_id);
                console.log("Subject: " + JSON.stringify(subject, null, 4));
                var subjectName = subject.subject_name;
                var subjectId = subject.id;
                var tp2 = s.TP2 || 0;
                var tp1 = s.TP1 || 0;
                var hk = s.HK || 0;
                var TK10 = 0;
                var TK4 = 0;
                var TKLetter = 'F';

                if (tp1 !== 0 && tp2 !== 0 && hk !== 0) {
                    TK10 = ScoreCaculator._10ScoreScaleCaculator(tp1, tp2, hk);
                    TK4 = ScoreCaculator._4ScoreScaleCaculator(tp1, tp2, hk);
                    TKLetter = ScoreCaculator._letterScoreScaleCaculator(tp1, tp2, hk);
                }

                var score = {
                    subject_id: subjectId,
                    subject_name: subjectName,
                    TP1: tp1,
                    TP2: tp2,
                    HK: hk,
                    TK4: TK4,
                    TK10: TK10,
                    TKLetter: TKLetter
                }

                result.push(score);
            }

            return result;
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },
    getScheduleByStudentId: async (id) => {
        try {
            const student = await Student.findByPk(id);
            if (!student)
                return '404';

            const scheduleList = await StudentSubjectClass.findAll({ where: { student_id: id } });
            const result = [];
            for (const schedule of scheduleList) {
                const subjectClass = await SubjectClass.findByPk(schedule.subject_class_id);
                const scheduleObject = await Schedule.findByPk(subjectClass.schedule_id);
                const subjectObject = await Subject.findByPk(subjectClass.subject_id);
                const lecturerObject = await Lecturer.findByPk(subjectClass.lecturer_id);

                const subjectName = subjectObject.subject_name || 'N/A';
                const subjectId = subjectObject.id || 'N/A';
                const subjectClassName = subjectClass.class_name || 'N/A';
                const lecturerName = lecturerObject.lecturer_name || 'N/A';
                const start_time = scheduleObject.start_time || 'N/A';
                const end_time = scheduleObject.end_time || 'N/A';

                const resultObject = {
                    subject_id: subjectId,
                    subject_name: subjectName,
                    class_name: subjectClassName,
                    lecturer_name: lecturerName,
                    start_time: start_time,
                    end_time: end_time
                }

                result.push(resultObject);
            }
            return result;
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    }

};

module.exports = StudentController;