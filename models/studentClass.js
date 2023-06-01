const sequelize = require('../configs/dbconnection');
const { DataTypes } = require('sequelize');

const model = sequelize.define('student_class', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    class_name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {timestamps: false});

module.exports = model;