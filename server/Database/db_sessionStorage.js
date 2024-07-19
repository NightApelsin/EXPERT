const { Pool } = require('pg');

const pool = new Pool({
	connectionString: 'postgres://postgres:1423@92.255.223.244:5432/EXPERTSESSIONSTORAGE',

});


module.exports = pool
