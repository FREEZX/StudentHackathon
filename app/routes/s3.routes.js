'use strict';
var crossroads = require('crossroads');
var files = require('../controllers/files.controller.js');
var s3 = require('../controllers/s3.controller.js');

module.exports = function(app) {
	crossroads.addRoute('/s3/sign{?query}', s3.sign);
};