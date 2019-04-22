
const request = require('request');

//get weather
let getWeather = (location) => {
    // console.log('location', location);
    return new Promise((resolve, reject) => {
        let url = `https://api.darksky.net/forecast/${process.env.DARKSKY_API}/${location.lat},${location.long}?units=si`;
        request({ url: url, json: true }, (err, res) => {
            if (err) {
                reject({
                    errorMsg: 'unable to connect to weather service'
                })
            } else if (res.body.code == 400) {
                reject({
                    errorMsg: 'Unable to find location'
                })
            } else {
                let data = res.body;


                // console.log(JSON.stringify('daily----', data.daily, null, 2));
                let status = `${data.daily.summary}It is currently ${data.currently.temperature}°C. There is a ${data.currently.precipProbability}% chance of rain. The wind speed is currently at ${windSpeedConverter(data.currently.windSpeed)}km/h, heading in a ${degToCompassPoint(data.currently.windBearing)} direction.`
                resolve({
                    status,
                    today: data.daily.data[0]
                })
            }
        })
    })
}

//get location
let getLocation = (search) => {
    // console.log('-----search', search);
    return new Promise((resolve, reject) => {
        const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=${process.env.MAPBOX_API}&limit=1`

        request({ url: geocodeURL, json: true }, (err, res) => {
            if (err) {
                reject({
                    errorMsg: 'unable to connect to location service'
                })
            } else if (res.body.features == undefined || res.body.features.length == 0) {
                reject({
                    errorMsg: 'unable to find location. Please try a different search'
                })
            } else {
                const long = res.body.features[0].center[0]
                const lat = res.body.features[0].center[1]
                const place = res.body.features[0].place_name
                resolve({
                    place,
                    lat,
                    long
                })
            }
        });
    });

}

let degToCompassPoint = (degree) => {
    let value = Math.floor((degree / 22.5) + 0.5);
    let compassPoints = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return compassPoints[(value % 16)];
}

function windSpeedConverter(windSpeend) {
    let value = parseFloat(windSpeend);
    return (value * 1.609344).toFixed(2);
}

module.exports = {
    getWeather,
    getLocation
}


