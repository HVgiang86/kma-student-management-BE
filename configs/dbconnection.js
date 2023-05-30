var mysql = require('mysql');

function getDbConnection() {
    var con = mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || 'admin'
    });

    con.connect(function (err) {
        if (err)
            throw err;

        console.log("Connected!");
        return con;
    });

}

module.exports = getDbConnection