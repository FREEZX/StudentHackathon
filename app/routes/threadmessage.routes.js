'use strict';
var crossroads = require('crossroads');
var threadmessages = require('../controllers/threadmessages.controller.js');
var users = require('../controllers/users.controller.js');

module.exports = function(app) {
	crossroads.addRoute('/threadmessages/list', threadmessages.list);
	crossroads.addRoute('/threadmessages/create', [users.requiresLogin, threadmessages.create]);
	crossroads.addRoute('/threadmessages/update/{threadmessagesId}', [users.requiresLogin, threadmessages.hasAuthorization, threadmessages.update]);
	crossroads.addRoute('/threadmessages/delete/{threadmessagesId}', [users.requiresLogin, threadmessages.hasAuthorization, threadmessages.delete]);
	crossroads.addRoute('/threadmessages/{threadmessagesId}', threadmessages.read);

	crossroads.param('threadmessagesId', threadmessages.threadmessageByID);
};