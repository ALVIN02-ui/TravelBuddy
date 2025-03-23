const sql = require('mssql');

// SQL Server configuration
const config = {
  user: 'your-username',        // Replace with your SQL Server username
  password: 'your-password',    // Replace with your SQL Server password
  server: 'localhost',          // Replace with your server name or IP
  database: 'TravelCompanion',  // Replace with your database name
  options: {
    encrypt: true,  // Use encryption for data connection (true for Azure)
    trustServerCertificate: true,  // Use this when you use self-signed certificates
  }
};

// Connect to the database
async function connectToDB() {
  try {
    await sql.connect(config);
    console.log('Connected to SQL Server');
  } catch (err) {
    console.error('Database connection failed:', err);
  }
}

module.exports = {
  connectToDB,
  sql,
};
