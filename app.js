var express   = require('express');
var config  = require('./config');
var http      = require('http');
var util      = require('util');
var path = require('path');
var async = require('async');
var colors  = require('colors');
var cors = require('cors');

const request = require('request');

console.log(('Server time: ').yellow, (new Date()).toString());
require('log-timestamp')(function() { return '[' + new Date() + '] %s' });

let app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(__dirname + '/public'));

var services = require('./services/services');

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

//Testing Google Geolocation API
var lat = 0;
var lng = 0;
services.getLocation( "v4e-2v4", (errorMessage, results) => {
	if ( errorMessage ){
		console.log(errorMessage);
	} else {
		lat = results.latitude;
		lng = results.longitude;
		console.log(`Latitude: ${results.latitude}`);
		console.log(`Longitude: ${results.longitude}`);
		//Testing DarkSky Weather API
		services.getWeather(lat, lng, (errorMessage, results) => {
			if ( errorMessage ) {
				console.log(errorMessage);
			} else {
				console.log(`Current Summary: ${results.currentSummary}`);
				console.log(`Current Temperature: ${results.currentTemperature}`);
				for ( i = 0; i < results.dailyLength; i++ )
				{
					console.log(`Day: ${results.dailyForecast[i].summary}`);
				}
			}
		})
	}
})

//Testing DarkSky Weather
//lat = 239289, long = 324923;
