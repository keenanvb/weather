require('./config/config');
let express = require('express');
let bodyParser = require('body-parser');
let getData = require('./utils/weather');
let app = express();
let checkDate = require('./utils/checkDate');

var cors = require('cors')

app.use(cors());

app.use(bodyParser.json());

// app.use((req, res, next) => {
//     let now = new Date().toString();
//     let log = `Date ${now} ${req.method} ${req.url} \n`;
//     fs.appendFile('logs.txt', log, (err) => {
//         if (err) {
//             console.log('Unable to append to log.txt')
//         }
//     });
//     next();
// });

// Maintenance
// app.use((req, res, next) => {
//     res.send({ msg: 'Maintenance' });
// })

let limit = 10;
let count = 0;

let limitAPI = {
    limit: 5,
    count: 0
}

app.post('/api/weather', (req, res) => {
    let body = req.body;
    limitAPI.count++;
    checkDate.checkDate(limitAPI);
    // console.log('body', body.search);
    console.log('count', limitAPI.count);
    if (limitAPI.count <= limitAPI.limit) {
        let data = async () => {
            try {
                let locationData = await getData.getLocation(req.body.search);
                let weatherData = await getData.getWeather(locationData);
                res.send({
                    weatherData,
                    locationData
                })
            } catch (err) {
                console.log(err)
                res.send({
                    err
                })
            }

        }

        data();
    } else {
        res.send({
            err: "API daily call limited has been reached"
        })
    }

});


app.listen(3000, () => {
    console.log(`listeing on port 3000`)
});