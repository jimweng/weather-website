const request = require('request');

const forecast = (longtitude, latitude, callback) => {
	const url = 'https://api.darksky.net/forecast/2626ef11705f5685bc8dbb426addcc40/'+ latitude +','+longtitude;
	request({url, json:true}, (err, {body}) => {
		if (err) {
			callback('Unable to connect to weather service!', undefined)
		} else if (body.error){
			callback('Unable to find location', undefined)
		} else {
			callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degree out. There is a '+ body.currently.precipProbability + '% chance of rain');
		}
	});
}

module.exports = forecast;