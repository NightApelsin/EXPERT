const { Pool } = require('pg');

const pool = new Pool({
	connectionString: 'postgres://postgres:1423@localhost:5432/EXPERTSESSIONSTORAGE',

});


module.exports = pool
