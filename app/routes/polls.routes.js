'use strict';
var crossroads = require('crossroads');
var polls = require('../controllers/polls.controller.js');
var users = require('../controllers/users.controller.js');

module.exports = function(app) {
	crossroads.addRoute('/polls/list', polls.list);
	crossroads.addRoute('/polls/create', [users.requiresLogin, polls.create]);
	crossroads.addRoute('/polls/update/{articleId}', [users.requiresLogin, polls.hasAuthorization, polls.update]);
	crossroads.addRoute('/polls/delete/{articleId}', [users.requiresLogin, polls.hasAuthorization, polls.delete]);
	crossroads.addRoute('/polls/{articleId}', polls.read);

	crossroads.param('pollId', polls.articleByID);
};