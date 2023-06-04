const sequelize = require('../configs/dbconnection');
const { DataTypes } = require('sequelize');
const user = require('./user');
const student_class = require('./studentClass');
const major = require('./major');

const model = sequelize.define('student', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    year_of_admission: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    graduation_year: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}, { timestamps: false });

model.hasOne(user, { foreignKey: 'uid' })
model.belongsTo(student_class, { foreignKey: 'class_id' });
model.belongsTo(major, { foreignKey: 'major_id' });

module.exports = model;