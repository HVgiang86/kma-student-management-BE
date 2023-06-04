const sequelize = require('../configs/dbconnection');
const { DataTypes } = require('sequelize');
const faculty = require('./faculty');

const model = sequelize.define('lecturer', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    lecturer_name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, { timestamps: false });

model.belongsTo(faculty, { foreignKey: 'faculty_id' });

module.exports = model;