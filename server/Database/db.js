const Pool = require("pg").Pool;

const pool = new Pool({
        user:"postgres",
        password:"root",
        host: "46.252.127.232",
        port: 5432,
        database: "expert"
    }
)
module.exports = pool;


