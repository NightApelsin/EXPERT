const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgres://postgres:root@46.252.112.82:5432/session_storage',
    
});


module.exports = pool