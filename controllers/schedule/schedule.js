const Schedule = require('../../models/schedule');

ScheduleController = {
    create: async (schedule) => {
        try {
            const id = schedule.id
            const start_time = schedule.start_time
            const end_time = schedule.end_time

            if (!id || !start_time || !end_time)
                return null;

            var result = await Schedule.findOne({ where: { id: id } });

            if (result)
                return null;

            result = await Schedule.findOne({ where: { start_time: start_time, end_time: end_time } });

            if (result)
                return null;

            var newSchedule = null;
            await Schedule.create({ id: id, start_time: start_time, end_time: end_time }).then(schedule => {
                console.log("Controller: Create schedule: " + JSON.stringify(schedule, null, 4));
                newSchedule = schedule;
            }).catch(err => {
                console.error('Controller: Unable to create schedule:', err);
                throw err;
            });

            return newSchedule;

        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },
    update: async (schedule) => {
        try {
            const id = schedule.id

            const scheduleToUpdate = await Schedule.findOne({ where: { id: id } });

            if (!scheduleToUpdate)
                return null;

            const result = scheduleToUpdate.update(schedule);

            return result;
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },
    delete: async (id) => {
        try {
            const result = await Schedule.findOne({ where: { id: id } });


            if (!result)
                return null;

            await result.destroy();
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },
    getScheduleList: async () => {
        try {
            const result = await Schedule.findAll();
            console.log("Controller: Get schedule list: " + JSON.stringify(result, null, 4));
            return result;
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    }
}

module.exports = ScheduleController;