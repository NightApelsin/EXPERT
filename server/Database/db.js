const Pool = require("pg").Pool;

const pool = new Pool({
    user:"expert_admin",
    password:"root",
    host: "46.252.112.82",
    port: 5432,
    database: "expert"
    }
)
module.exports = pool;


