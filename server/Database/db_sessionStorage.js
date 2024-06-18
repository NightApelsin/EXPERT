const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgres://expert_admin:root@localhost:5432/session_storage',
    
});


module.exports = pool