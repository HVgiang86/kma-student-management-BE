const sequelize = require('../configs/dbconnection');
const { Sequelize, DataTypes } = require('sequelize');

const students = require('./student');
const subject_class = require('./subjectClass');

const model = sequelize.define('student_subject_class', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    }
}, {timestamps: false});

model.hasOne(subject_class, {foreignKey: 'subject_class_id'})
model.hasOne(students, {foreignKey: 'student_id'})

module.exports = model;