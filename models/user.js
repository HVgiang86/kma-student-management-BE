const sequelize = require('../configs/dbconnection');
const { DataTypes } = require('sequelize');

const user = sequelize.define('user', {
    uid: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    hashed_password: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone_number: { 
        type: DataTypes.STRING,
        allowNull: true,
    },
    address: { 
        type: DataTypes.STRING,
        allowNull: true,
    },
    date_of_birth: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    citizen_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    nation: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    religion: { 
        type: DataTypes.STRING,
        allowNull: true,
    },
    nationality: { 
        type: DataTypes.STRING,
        allowNull: true,
    },
    gender: {
        type: DataTypes.ENUM('male','female','other'),
        allowNull: false,
    },
    role_name: {
        type: DataTypes.ENUM('admin','student'),
        allowNull: false,
    },
},{
    timestamps: false,
});

module.exports = user;