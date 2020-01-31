const request = require('request');

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/542d2c10414b07922db594691045c63a/${lat},${long}?units=si`

    console.log(url)

    request({ url, json: true }, (err, { body }) => {

        if(err) {
            callback('Unable to connect.');
        } else if(body.error) {
            callback('Invalid location');
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees Celsius. There is ${body.currently.precipProbability}% chance of rain. Temperature high for today is ${body.daily.data[0].temperatureHigh} degrees Celsius, and temperature low is ${body.daily.data[0].temperatureLow} degrees Celsius`)
        }  
    })
}

module.exports = forecast;