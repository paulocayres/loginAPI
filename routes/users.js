var express = require('express');
var router = express.Router();

var users = [
  {id: 1, name: "John", email: "john@mail.com", password: "john123"},
  {id: 2, name: "Sarah", email: "sarah@mail.com", password: "sarah123"}
  ];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
