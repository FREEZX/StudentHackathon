'use strict';
var crossroads = require('crossroads');
var files = require('../controllers/files.controller.js');
var users = require('../controllers/users.controller.js');

module.exports = function(app) {
	crossroads.addRoute('/files/list', files.list);
	crossroads.addRoute('/files/list{?query}', files.list);
	crossroads.addRoute('/files/create', [users.requiresLogin, files.create]);
	crossroads.addRoute('/files/update/{fileId}', [users.requiresLogin, files.hasAuthorization, files.update]);
	crossroads.addRoute('/files/delete/{fileId}', [users.requiresLogin, files.hasAuthorization, files.delete]);
	crossroads.addRoute('/files/{fileId}', files.read);

	crossroads.param('fileId', files.fileByID);
};