'use strict';
var crossroads = require('crossroads');
var forumthreads = require('../controllers/forumthreads.controller.js');
var users = require('../controllers/users.controller.js');

module.exports = function(app) {
	crossroads.addRoute('/forumthreads/list', forumthreads.list);
	crossroads.addRoute('/forumthreads/create', [users.requiresLogin, forumthreads.create]);
	crossroads.addRoute('/forumthreads/update/{forumthreadId}', [users.requiresLogin, forumthreads.hasAuthorization, forumthreads.update]);
	crossroads.addRoute('/forumthreads/delete/{forumthreadId}', [users.requiresLogin, forumthreads.hasAuthorization, forumthreads.delete]);
	crossroads.addRoute('/forumthreads/{forumthreadId}', forumthreads.read);

	crossroads.param('forumthreadId', forumthreads.forumthreadByID);
};