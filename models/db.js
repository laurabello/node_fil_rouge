const dbConfig = require("../config/db.config.js");
const mariadb = require('mariadb');

const pool = mariadb.createPool({
     host: dbConfig.HOST, 
     user: dbConfig.USER,
     password: dbConfig.PASSWORD,
     database: dbConfig.DB
});

// open the MariaDB connection
pool.getConnection()
    .then(conn => {
      console.log("ok connection")
    }).catch(err => {
      console.log("error connection")
});

module.exports = pool;