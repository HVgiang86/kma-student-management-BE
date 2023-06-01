const sequelize = require('../configs/dbconnection');
const { Sequelize, DataTypes } = require('sequelize');

const subject = require('./subject');
const student = require('./student');

const model = sequelize.define('major', {
    TP1: {
        type: DataTypes.FLOAT,

    },
    TP2: {
        type: DataTypes.FLOAT,
    },
    HK: {
        type: DataTypes.FLOAT,
    }
}, {timestamps: false});

model.belongsTo(subject, {foreignKey: 'subject_id'})
model.belongsTo(student, {foreignKey: 'student_id'});

module.exports = model;