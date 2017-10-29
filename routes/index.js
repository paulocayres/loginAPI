var express = require('express');
var router = express.Router();
var auth = require("../auth.js")();
var users = require('./users.js');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cfg = require('../config.js');
var jwt = require("jwt-simple");


router.use(auth.initialize());
//router.use('/users', users);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/token", function(req, res) {
  if (req.body.email && req.body.password) {
    var email = req.body.email;
    var password = req.body.password;
    var user = users.find( u => {
      return u.email == email && u.password == password;
    });
    if (user) {
      var payload = {id: user.id};
      console.log(payload);
      console.log(cfg.jwtSecret);
      var token = jwt.encode(payload, cfg.jwtSecret);
      res.json({token: token});
    } else {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(401);
  }
});

router.get("/user", auth.authenticate(), function(req, res) {
  res.json(users[req.user.id]);
});

module.exports = router;
