var express   = require('express');
var config  = require('./config');
var http      = require('http');
var util      = require('util');
var path = require('path');
var async = require('async');
var colors  = require('colors');
var cors = require('cors');

var services = require('./services/services');

const request = require('request');
const fs = require('fs');

console.log(('Server time: ').yellow, (new Date()).toString());
require('log-timestamp')(function() { return '[' + new Date() + '] %s' });

let app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(__dirname + '/public'));

const API_KEY = '24431d0e56632af62a7e1891d23a0fd9'
const API_URL = `https://api.darksky.net/forecast/${API_KEY}`

app.get('/api/getData', function(req,res){

});


app.get('*', function(req, res) {
	console.log("Sending the index.html");
    res.status(200).sendFile(path.resolve('public/index.html'));
});


app.set('port', (process.env.PORT || 5000));

//MARK::::: HEROKU does not listen in any other port than 5000
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

var data = require('./data.json');

async.each(data, function(item, done) {
	let encodedAddress = data[data.indexOf(item)].name;
	console.log(data.indexOf(item));
	// services.getLocation(data[data.indexOf(item)].name, (errorMessage, results) => {
	// 	if ( errorMessage ){
	// 		console.log(errorMessage);
	// 		console.log("error");
	// 	} else {
	// 		data[data.indexOf(item)].latitude = results.latitude;
	// 		console.log("DATA: " + data[data.indexOf(item)].latitude);
	// 		data[data.indexOf(item)].longitude = results.longitude;
	// 	}
	// })
	request ({//makes api request to google geolocation api
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true //tells request that the data coming back is JSON data.  Takes JSON string and convert it to object
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Google servers.');
    } else if (body.status === 'ZERO_RESULTS') {//google geocode api status variable that displays whether or not the request was successful
      callback('Unable to find that address.');
    } else if (body.status === 'OK') {
			console.log(data.indexOf(item));
			data[data.indexOf(item)].latitude = body.results[0].geometry.location.lat,
			data[data.indexOf(item)].longitude = body.results[0].geometry.location.lng
    }
  });



})

setTimeout(function(){
	fs.writeFile("test.json", JSON.stringify(data), function(err) {
			 if(err) {
					 return console.log(err);
			 }
	});
}, 10000);


//Testing Google Geolocation API
