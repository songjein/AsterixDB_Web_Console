var express = require('express');
var router = express.Router();

var request = require('request');

/**
* root address => serving index.html file
*/
router.get('/', function(req, res, next) {
	res.sendFile('index.html');
});

/** 
* query proxy
* for the CROS problem at javascript
*/

var headers = {
	'User-Agent':       'Super Agent/0.0.1',
	'Content-Type':     'application/x-www-form-urlencoded'
}

router.post('/query-service', (req, res, next) => {	
	var host = 'http://localhost:19002';
	var path = '/query/service';
	var statement = req.body.statement

	var options = {
		url: host + path,	
		method: 'POST',
		headers: headers,
		form: {"statement": statement}
	};

	console.log("addr, params", options.url, options.form);

	request(options, function(error, response, body){
		console.log("result at router", body);
		res.json(body);			
	});
});

router.get('/query_aql', (req, res, next) => {	
	var host = 'http://localhost:19002';
	var path = '/query?query=';
	var query = req.query.query

	request({
		url: host + path + query,	
		json: true
	}, function(error, response, body){
		res.json(body);			
	});
});

router.get('/query_sqlpp', (req, res, next) => {	
	var host = 'http://localhost:19002';
	var path = '/query/sqlpp?query=';
	var query = req.query.query

	request({
		url: host + path + query,	
		json: true
	}, function(error, response, body){
		res.json(body);			
	});
});

router.get('/ddl_aql', (req, res, next) => {	
	var host = 'http://localhost:19002';
	var path = '/ddl?ddl=';
	var query = req.query.ddl

	request({
		url: host + path + query,	
	}, function(error, response, body){
		res.send(response.statusCode);			
	});
});

router.get('/ddl_sql', (req, res, next) => {	
	var host = 'http://localhost:19002';
	var path = '/ddl/sqlpp?ddl=';
	var query = req.query.ddl

	request({
		url: host + path + query,	
	}, function(error, response, body){
		res.send(response.statusCode);			
	});
});



module.exports = router;
