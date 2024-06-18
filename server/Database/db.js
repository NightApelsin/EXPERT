const Pool = require("pg").Pool;

const pool = new Pool({
    user:"expert_admin",
    password:"root",
    host: "localhost",
    port: 5432,
    database: "expert"
    }
)
module.exports = pool;


