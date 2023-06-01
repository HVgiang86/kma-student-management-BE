const sequelize = require('../configs/dbconnection');
const { Sequelize, DataTypes } = require('sequelize');
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
}, {timestamps: false});

model.hasOne(subject, {foreignKey: 'subject_id'})
model.hasOne(lecturer, {foreignKey: 'lecturer_id'})
model.hasOne(schedule, {foreignKey: 'schedule_id'})

module.exports = model;