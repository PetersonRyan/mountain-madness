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

var data = require('./data.json');

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
	res.json(data);
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



var tracker = 0;
var myData = setInterval(function(){ addLatLong() }, 300);

function addLatLong(){
	let encodedAddress = data[tracker].name;

	request ({//makes api request to google geolocation api
		url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
		json: true 
	}, (error, response, body) => {
		if (error) {
			callback('Unable to connect to Google servers.');
		} else if (body.status === 'ZERO_RESULTS') {//google geocode api status variable that displays whether or not the request was successful
			callback('Unable to find that address.');
		} else if (body.status === 'OK') {
			if (!(tracker >= data.length - 1)){
				console.log(tracker);
				data[tracker].latitude = body.results[0].geometry.location.lat;
				data[tracker].longitude = body.results[0].geometry.location.lng;
				tracker++;  
			}
		}
	});
	
	if (tracker >= data.length - 1){
		clearInterval(myData);	
		fs.writeFile("test.json", JSON.stringify(data), function(err) {
			if(err) {
					return console.log(err);
			}
   		});
	}
}


//Testing Google Geolocation API
