var env = require('node-env-file');
env(__dirname+'/.env')
var init = require('./config/init')();
var app = require('./config/http')();
require('./config/passport')();
require('./config/mongoose')();