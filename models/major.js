const sequelize = require('../configs/dbconnection');
const faculty = require('./faculty');
const { DataTypes } = require('sequelize');

const model = sequelize.define('major', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    major_name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, { timestamps: false });

model.belongsTo(faculty, { foreignKey: 'faculty_id' })

module.exports = model;