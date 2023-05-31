require('dotenv').config();
var host = process.env.DB_HOST 
var user = process.env.DB_USER
var password = process.env.DB_PASS
var database = process.env.DB_NAME

console.log(`host: ${host}`)
console.log(`user: ${user}`)
console.log(`password: ${password}`)
console.log(`database: ${database}`)


const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: 'mysql',
});

module.exports = sequelize;