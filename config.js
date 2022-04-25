const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users'
});

db.connect( (e) => {
    if(e) throw e.message;
    console.log('Connected!');
});

module.exports.db = db;