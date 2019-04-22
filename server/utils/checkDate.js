let fs = require('fs');
let moment = require('moment');

let checkDate = (limitAPI) => {
    if (fs.existsSync('./date.txt')) {
        let serverDate = fs.readFileSync('date.txt', 'utf8');
        let now = moment().format("YYYY-MM-DD");
        let start = moment(serverDate, "YYYY-MM-DD");
        let end = moment(now, "YYYY-MM-DD");
        let duration = end.diff(start, 'days');
        console.log('duration', duration);
        if (duration >= 1) {
            count = 0;
            limitAPI.count = 0;
            console.log('limitAPI.count', limitAPI.count);
            let date = moment().format("YYYY-MM-DD");
            fs.writeFileSync('date.txt', date);
        }
    } else {
        let date = moment().format("YYYY-MM-DD");
        fs.writeFileSync('date.txt', date);
        checkDate();
    }
}

module.exports = { checkDate }