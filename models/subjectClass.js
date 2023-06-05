const sequelize = require('../configs/dbconnection');
const { DataTypes } = require('sequelize');
const subject = require('./subject');
const lecturer = require('./lecturer');
const schedule = require('./schedule');

const model = sequelize.define('subject_class', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    class_name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, { timestamps: false });

model.belongsTo(subject, { foreignKey: 'subject_id' })
model.hasOne(lecturer, { foreignKey: 'id' })
model.hasOne(schedule, { foreignKey: 'id' })

module.exports = model; 