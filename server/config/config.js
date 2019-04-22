var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    var config = require('./config.json');
    var envConfig = config[env];
    Object.keys(envConfig).forEach((val) => {
        process.env[val] = envConfig[val];
    });
}

//console.log('process.env', process.env);
