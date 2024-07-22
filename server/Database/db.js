const Pool = require("pg").Pool;

const pool = new Pool({
	user:"postgres",
        password:"1423",
        host: "localhost",
        port: 5432,
        database: "EXPERTMAINDB"
    }
)
module.exports = pool;


