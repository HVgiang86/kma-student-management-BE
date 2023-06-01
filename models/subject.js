const sequelize = require('../configs/dbconnection');
const { Sequelize, DataTypes } = require('sequelize');

const model = sequelize.define('subjects', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    credits: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    subject_name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {timestamps: false});

module.exports = model;