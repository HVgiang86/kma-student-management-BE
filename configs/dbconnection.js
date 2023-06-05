require('dotenv').config();
const mysql2 = require('mysql2');
var host = process.env.DB_HOST 
var user = process.env.DB_USER
var password = process.env.DB_PASS
var database = process.env.DB_NAME

console.log(`host: ${host}`)
console.log(`user: ${user}`)
console.log(`password: ${password}`)
console.log(`database: ${database}`)


const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: 'mysql',
    "dialectModule" : mysql2,
});

module.exports = sequelize;