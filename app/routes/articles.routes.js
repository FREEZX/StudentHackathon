'use strict';
var crossroads = require('crossroads');
var articles = require('../controllers/articles.controller.js');
var users = require('../controllers/users.controller.js');

module.exports = function(app) {
	crossroads.addRoute('/articles/list', articles.list);
	crossroads.addRoute('/articles/create', [users.requiresLogin, articles.create]);
	crossroads.addRoute('/articles/update/{articleId}', [users.requiresLogin, articles.hasAuthorization, articles.update]);
	crossroads.addRoute('/articles/delete/{articleId}', [users.requiresLogin, articles.hasAuthorization, articles.delete]);
	crossroads.addRoute('/articles/{articleId}', articles.read);

	crossroads.param('articleId', articles.articleByID);
};