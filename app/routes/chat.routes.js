'use strict';
var crossroads = require('crossroads');
var chat = require('../controllers/chat.controller.js');
var users = require('../controllers/users.controller.js');

module.exports = function(app) {
	crossroads.addRoute('/chat/create', [users.requiresLogin, chat.create]);
	crossroads.addRoute('/chat/join', [users.requiresLogin, chat.join]);
	crossroads.addRoute('/chat/leave', [users.requiresLogin, chat.leave]);
};