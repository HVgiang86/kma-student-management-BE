const sequelize = require('../configs/dbconnection');
const { DataTypes } = require('sequelize');

const model = sequelize.define('schedules', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    start_time: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    end_time: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, { timestamps: false });

module.exports = model;