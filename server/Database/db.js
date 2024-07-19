const Pool = require("pg").Pool;

const pool = new Pool({
	user:"postgres",
        password:"1423",
        host: "92.255.223.244",
        port: 5432,
        database: "EXPERTMAINDB"
    }
)
module.exports = pool;


