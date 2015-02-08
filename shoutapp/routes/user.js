var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');

var client = new cassandra.Client({contactPoints : ['127.0.0.1']});
client.connect(function(err, result){
    console.log('cassandra connected: user');
});

var getByUsername = 'SELECT * FROM shoutapp.users WHERE username = ?';

router.get('/:username', function(req, res){
	client.execute(getByUsername,[req.params.username], function(err, result){
		if(err){
			res.status(404).send({msg: err});
		} else {
			res.render('user',{
				username: result.rows[0].username,
				email: result.rows[0].email,
				full_name: result.rows[0].full_name
			});
		}
	});
});

var deleteUser = "DELETE FROM shoutapp.users WHERE username = ?";

router.delete('/:username', function(req, res){
	client.execute(deleteUser,[req.params.username], function(err, result){
		if(err){
			res.status(404).send({msg: err});
		} else {
			res.json(result);
		}
	});
});

module.exports = router;