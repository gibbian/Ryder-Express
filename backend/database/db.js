const mysql = require('mysql');

//mysql connection
var pool = mysql.createPool({
    host: process.env.MYSQL_CLOUD_HOST,
    user: process.env.MYSQL_CLOUD_USER,,
    password: process.env.MYSQL_CLOUD_PASSWORD,
    port: process.env.MYSQL_CLOUD_PORT,,
    database: process.env.MYSQL_CLOUD_DATABASE
});

module.export = pool;