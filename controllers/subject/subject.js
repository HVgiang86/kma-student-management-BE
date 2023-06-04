const Subject = require('../../models/subject');
const SubjectClassModel = require('../../models/subjectClass');

SubjectController = {
    create: async (subject) => {
        try {
            const id = subject.id
            const credits = subject.credits
            const subject_name = subject.subject_name

            if (!id || !credits || !subject_name)
                return null;

            var result = await Subject.findOne({ where: { id: id } });

            if (result)
                return null;

            var newSubject = null;
            await Subject.create({ id: id, credits: credits, subject_name: subject_name }).then(subject => {
                console.log("Controller: Create subject: " + JSON.stringify(subject, null, 4));
                newSubject = subject;
            }).catch(err => {
                console.error('Controller: Unable to create subject:', err);
                throw err;
            });

            return newSubject;

        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },
    update: async (subject) => {
        try {
            const id = subject.id

            const subjectToUpdate = await Subject.findOne({ where: { id: id } });

            if (!subjectToUpdate)
                return null;

            const result = subjectToUpdate.update(subject);

            return result;
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },
    delete: async (id) => {
        try {
            const subject = await Subject.findByPk(id);
            if (!subject)
                return 404;
            else {
                const num = (await SubjectClassModel.findAll({ where: { subject_id: id } })).length;
                if (num !== 0) {
                    return 400;
                } else {
                    const result = await subject.destroy();
                    if (result) {
                        return 200;
                    } else {
                        return 500;
                    }
                }
            }

        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },
    getSubjectList: async () => {
        try {
            const result = await Subject.findAll();
            console.log("Controller: Get Subject list: " + JSON.stringify(result, null, 4));
            return result;
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    }
}

module.exports = SubjectController;