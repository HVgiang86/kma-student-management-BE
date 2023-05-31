var host = process.env.DB_HOST || 'localhost' 
var user = process.env.DB_USER || 'root'
var password = process.env.DB_PASS || 'admin'
var database = process.env.DB_DATABASE || 'kma_student_management'

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: 'mysql',
});

module.exports = sequelize;