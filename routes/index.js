const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/ekainfo';
var crypto = require('crypto'), algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

    
function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

router.get('/', (req, res, next) => {
    res.sendFile(path.join(
    __dirname, '..', '..', 'public', 'index.html'));
});

router.get('/api/v1/form2', (req, res, next) => {
    res.sendFile(path.join(
    __dirname, '..', '..', 'public', 'form2.html'));
});

router.post('/api/v1/form1', (req, res, next) => {
  const results = [];
  // Grab data from http request
  const data = {username: req.body.userName, password: req.body.password, email: req.body.email};
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    var hashedPassword = encrypt(data.password);  
    var myQuery = "SELECT * FROM userInfo where username="+data.username;  
    client.query(myQuery, function(err, result) {
        if (result == null) {  
            client.query('INSERT INTO userInfo(username, password, email) values ($1, $2, $3)',
            [data.username, hashedPassword, data.email]);
        } else {        
            client.query( 'UPDATE userInfo SET username=$1, password=$2, email=$3  WHERE username = $4', [data.username, hashedPassword, data.email, data.username]);
        }
    });
    
  });
});


router.post('/api/v1/form2', (req, res, next) => {
  const results = [];
  // Grab data from http request
  const data = {firstName: req.body.firstName, lastName: req.body.lastName, phone: req.body.phone, username: req.body.userName};
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
     client.query( 'UPDATE userInfo SET firstname = $1, lastname=$2, phone=$3  WHERE username = $4', [data.firstName, data.lastName, data.phone,data.username]);
  });
});

router.post('/api/v1/form3', (req, res, next) => {
  const results = [];

  const data = {address: req.body.address, city: req.body.city, state: req.body.state, zip: req.body.zip, username: req.body.userName};
 
  pg.connect(connectionString, (err, client, done) => {
    
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
     client.query( 'UPDATE userInfo SET address=$1, city=$2, state=$3, zip=$4  WHERE username = $5', [data.address, data.city, data.state, data.zip, data.username]);
  });
});

module.exports = router;