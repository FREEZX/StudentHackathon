'use strict';
var crossroads = require('crossroads');
var polls = require('../controllers/polls.controller.js');
var users = require('../controllers/users.controller.js');

module.exports = function(app) {
	crossroads.addRoute('/polls/list', polls.list);
	crossroads.addRoute('/polls/create', [users.requiresLogin, polls.create]);
	crossroads.addRoute('/polls/update/{pollId}', [users.requiresLogin, polls.hasAuthorization, polls.update]);
	crossroads.addRoute('/polls/delete/{pollId}', [users.requiresLogin, polls.hasAuthorization, polls.delete]);
	crossroads.addRoute('/polls/{pollId}', [polls.pollByID, polls.read]);

	crossroads.param('pollId', polls.articleByID);
};