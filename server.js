const express = require('express');
var app = express();
var fs = require("fs");
var path = require("path");
app.use( express.static( __dirname + '/public' ));
const PORT = process.env.PORT || 9000;

app.get( '/mydata', function( req, res ) {
	var contents = fs.readFileSync(path.join( __dirname, 'data', 'data.json')); // Get content from file
	var jsonContent = JSON.parse(contents); // Define to JSON type
	res.setHeader('Content-Type', 'application/json');
	res.send(jsonContent);
});

app.get( '/', function( req, res ) {
	res.sendFile(path.join( __dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}!`);
});