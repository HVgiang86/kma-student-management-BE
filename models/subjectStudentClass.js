const sequelize = require('../configs/dbconnection');
const { DataTypes } = require('sequelize');

const students = require('./student');
const subject_class = require('./subjectClass');

const model = sequelize.define('student_subject_class', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }
}, { timestamps: false });

model.belongsTo(subject_class, { foreignKey: 'subject_class_id' })
model.belongsTo(students, { foreignKey: 'student_id' })

module.exports = model;