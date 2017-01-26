var express = require('express');
var router = express.Router();

var request = require('request');

/**
* root address => serving index.html file
*/
router.get('/', function(req, res, next) {
	//res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
	res.sendFile('index.html');
});

/** 
* query proxy
* for the CROS problem at javascript
*/
router.get('/query_aql', (req, res, next) => {	
	// this addr will be replaced with 'localhost'
	var host = 'http://sclab.gachon.ac.kr:19002';
	var path = '/query?query=';
	var query = req.query.query

	request({
		url: host + path + query,	
		json: true
	}, function(error, response, body){
		res.json(body);			
	});
});

module.exports = router;
