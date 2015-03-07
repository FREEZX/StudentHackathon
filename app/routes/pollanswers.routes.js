'use strict';
var crossroads = require('crossroads');
var pollAnswers = require('../controllers/pollanswers.controller.js');
var users = require('../controllers/users.controller.js');

module.exports = function(app) {
	crossroads.addRoute('/pollanswers/list', pollAnswers.list);
	crossroads.addRoute('/pollanswers/create', [users.requiresLogin, pollAnswers.create]);
	crossroads.addRoute('/pollanswers/update/{pollAnswerId}', [users.requiresLogin, pollAnswers.hasAuthorization, pollAnswers.update]);
	crossroads.addRoute('/pollanswers/delete/{pollAnswerId}', [users.requiresLogin, pollAnswers.hasAuthorization, pollAnswers.delete]);
	crossroads.addRoute('/pollanswers/{pollAnswerId}', pollAnswers.read);

	crossroads.param('pollAnswerId', pollAnswers.pollAnswerByID);
};