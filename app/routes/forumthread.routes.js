'use strict';
var crossroads = require('crossroads');
var forumthreads = require('../controllers/forumthreads.controller.js');
var users = require('../controllers/users.controller.js');

module.exports = function(app) {
	crossroads.addRoute('/forumthread/list', forumthreads.list);
	crossroads.addRoute('/forumthread/create', [users.requiresLogin, forumthreads.create]);
	crossroads.addRoute('/forumthread/update/{forumthreadId}', [users.requiresLogin, forumthreads.hasAuthorization, forumthreads.update]);
	crossroads.addRoute('/forumthread/delete/{forumthreadId}', [users.requiresLogin, forumthreads.hasAuthorization, forumthreads.delete]);
	crossroads.addRoute('/forumthread/{forumthreadId}', forumthreads.read);

	crossroads.param('forumthreadId', forumthreads.forumthreadByID);
};