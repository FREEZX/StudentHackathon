'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.controller'),
	_ = require('lodash');

/**
 * Send a chat message
 */
exports.create = function(spark, message) {
	var data = message.data;
	data = _.extend(data, {
		user: spark.request.user
	});
	spark.primus.room('chat').write({action: 'chatmessage', data: data, seq: 0});
	spark.response(data, message);
};

/**
 * Join chat
 */
exports.join = function(spark, message) {
	spark.join('chat', function(){});
	spark.response({}, message);
};

/**
 * Leave chat
 */
exports.leave = function(spark, message) {
	spark.leave('chat', function(){});
};