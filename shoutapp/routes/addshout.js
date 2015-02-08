var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');

var client = new cassandra.Client({contactPoints : ['127.0.0.1']});
client.connect(function(err, result){
    console.log('cassandra connected: addshout');
});


router.post('/', function(req, res){
	var id1 = cassandra.types.uuid();
	var id2 = cassandra.types.timeuuid();

	var queries = [
		{
			query: 'INSERT INTO shoutapp.shouts(shout_id, username, body) VALUES(?,?,?)',
			params:[id1, req.body.username, req.body.body]
		},
		{
			query: 'INSERT INTO shoutapp.usershouts(username, shout_id, body) VALUES(?,?,?)',
			params: [req.body.username, id2, req.body.body]
		}
	];
	queryOptions = {};
	client.batch(queries, queryOptions, function(err){
		console.log(err);
		res.redirect('/shouts');
	});
});


module.exports = router;