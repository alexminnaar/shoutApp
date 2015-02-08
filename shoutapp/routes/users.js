var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');

var client = new cassandra.Client({contactPoints : ['127.0.0.1']});
client.connect(function(err, result){
    console.log('cassandra connected: users');
});

var getAllUsers = 'SELECT * FROM shoutapp.users';

/* GET users listing. */
router.get('/', function(req, res) {
  client.execute(getAllUsers,[], function(err, result){
  	if(err){
  		res.status(404).send({msg: err});
  	} else {
  		//res.json(result);
  		res.render('users',{
  			users: result.rows
  		});
  	}
  });
});

module.exports = router;
