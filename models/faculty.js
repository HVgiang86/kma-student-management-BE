const sequelize = require('../configs/dbconnection');
const { DataTypes } = require('sequelize');

const model = sequelize.define('faculty', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    faculty_name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {timestamps: false});


module.exports = model;