const express = require('express');
const res = require('express/lib/response');
const app = express();
const port =process.env.PORT || 3000
const {db} = require('./config');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.get('/', (req, res) => {
    res.contentType('text/html');
    res.send("<h2>Welcome to User App</h2>");
});

app.get('/user', (req, res) => {
    let select = 'SELECT * FROM users';
    db.query(select, (e, result)=>{
        if(e) throw e;
        res.status(200).json(result);
        console.log(result);
    });
});

app.get('/user/:userid', (req, res) => {
    let select = `SELECT * FROM users WHERE userid = ${Number(req.params.userid)}`;
    db.query(select, (e, result)=>{
        if(e) throw e;
        res.status(200).json(result);
        console.log(result);
    });
});

app.post('/user', (req, res) => {
    const {username, email, phone, country} = req.body;
    let sql = `INSERT INTO users VALUES( NULL, ${db.escape(username)}, ${db.escape(email)}, ${db.escape(phone)}, ${db.escape(country)} )`;
    db.query(sql, (e, result)=>{
        if(e) throw e;
        res.status(200).json(result.insertId);
        console.log(result.insertId);
    });
});


app.put('/user/:userid', (req, res) => {
    const {username, email, phone, country} = req.body;
    const sql = `UPDATE users SET username = ?, email = ?, phone = ?, country = ?  WHERE userid = ${Number(req.params.userid)}`; 
    db.query(sql, [username?.trim(), email?.trim(), phone?.trim(), country?.trim()], e =>{
        if(e) throw e;
        res.status(200).send(`User with userid = ${req.params.userid} has been UPDATED`);
    });
});


app.delete('/user/:userid', (req, res) => {
    const sql = `DELETE FROM users WHERE userid = ${Number(req.params.userid)}`; 
    db.query(sql, (e) => {
        if(e) throw e;
        res.status(200).send(`User with userid = ${req.params.userid} has been DELETED`);
    });
});


app.listen(port, ()=> {
    console.log(`Server listen port ${port}`);
})