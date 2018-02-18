const request = require('request');

const API_KEY = '24431d0e56632af62a7e1891d23a0fd9'
const API_URL = `https://api.darksky.net/forecast/${API_KEY}`

var getWeather = (lat, lng, callback) => {//adjust DarkSky api url to contain desired coordinates

  var url = API_URL + `/${lat},${lng}`
  //var url = "https://api.darksky.net/forecast/24431d0e56632af62a7e1891d23a0fd9/49.1230561,-122.8964675"
  request({
    url: url,
    json: true
  }, (error, response, body) => {
      if(!error && response.statusCode === 200) {
        callback(undefined, {
          currentSummary: body.currently.summary,
          currentTemperature: body.currently.temperature,
          dailyLength: body.daily.data.length,
          dailyForecast: body.daily.data
        });
      } else {
        callback(`Unable to fetch weather. statusCode: ${response.statusCode}`);
      }
  });
}

var getLocation = (address, callback) => {
  var encodedAddress = encodeURIComponent(address) //takes plain text address (user input) and return encoded result for injection to google geocode api request url

  request ({//makes api request to google geolocation api
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true //tells request that the data coming back is JSON data.  Takes JSON string and convert it to object
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Google servers.');
    } else if (body.status === 'ZERO_RESULTS') {//google geocode api status variable that displays whether or not the request was successful
      callback('Unable to find that address.');
    } else if (body.status === 'OK') {
      callback(undefined, {
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    }
  });
};

module.exports = {
  getWeather,
  getLocation
}
