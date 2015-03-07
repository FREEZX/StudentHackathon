'use strict';
var crossroads = require('crossroads');
var polls = require('../controllers/polls.controller.js');
var users = require('../controllers/users.controller.js');

module.exports = function(app) {
	crossroads.addRoute('/poll/list', polls.list);
	crossroads.addRoute('/poll/create', [users.requiresLogin, polls.create]);
	crossroads.addRoute('/poll/update/{articleId}', [users.requiresLogin, polls.hasAuthorization, polls.update]);
	crossroads.addRoute('/poll/delete/{articleId}', [users.requiresLogin, polls.hasAuthorization, polls.delete]);
	crossroads.addRoute('/poll/{articleId}', polls.read);

	crossroads.param('pollId', polls.articleByID);
};