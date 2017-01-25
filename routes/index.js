var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res, next) {
	//res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
	res.sendFile('index.html');
});

router.get('/abc', (req, res, next) => {	
	res.send('test OK');
});

module.exports = router;
