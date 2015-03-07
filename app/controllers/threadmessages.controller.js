'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.controller'),
	ThreadMessage = mongoose.model('ThreadMessage'),
	_ = require('lodash');

/**
 * Create a threadMessage
 */
exports.create = function(spark, message) {
	var threadMessage = new ThreadMessage(message.data);
	threadMessage.user = spark.request.user;

	threadMessage.save(function(err) {
		if (err) {
			console.log(err);
			return spark.status(400).error({
				message: errorHandler.getErrorMessage(err)
			}, message);
		} else {
			spark.response(threadMessage, message);
		}
	});
};

/**
 * Show the current threadMessage
 */
exports.read = function(spark, message) {
	spark.response(spark.request.threadMessage, message);
};

/**
 * Update a threadMessage
 */
exports.update = function(spark, message) {
	var threadMessage = spark.request.threadMessage;

	threadMessage = _.extend(threadMessage, message.data);

	threadMessage.save(function(err) {
		if (err) {
			return spark.status(400).error({
				message: errorHandler.getErrorMessage(err)
			}, message);
		} else {
			spark.response(threadMessage, message);
		}
	});
};

/**
 * Delete an threadMessage
 */
exports.delete = function(spark, message) {
	var threadMessage = spark.request.threadMessage;

	threadMessage.remove(function(err) {
		if (err) {
			return spark.status(400).error({
				message: errorHandler.getErrorMessage(err)
			}, message);
		} else {
			spark.response(threadMessage, message);
		}
	});
};

/**
 * List of ThreadMessages
 */
exports.list = function(spark, message, query) {
	ThreadMessage.find({thread: query.thread}).sort('-created').limit(30).populate('user', 'displayName').exec(function(err, threadMessages) {
		if (err) {
			return spark.status(400).error({
				message: errorHandler.getErrorMessage(err)
			}, message);
		} else {
			spark.response(threadMessages, message);
		}
	});
};

/**
 * ThreadMessage middleware
 */
exports.threadMessageByID = function(spark, message, id, cb) {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		var err = {
			message: 'ThreadMessage is invalid'
		};
		spark.status(400).error(err, message);

		return cb(err);
	}

	ThreadMessage.findById(id).populate('user', 'displayName').exec(function(err, threadMessage) {
		if (err) return cb(err);
		if (!threadMessage) {
			err = {
  				message: 'ThreadMessage not found'
  			};
  			console.log(message);
			return spark.status(404).error(err, message);
		}
		spark.request.threadMessage = threadMessage;
		cb();
	});
};

/**
 * ThreadMessage authorization middleware
 */
exports.hasAuthorization = function(spark, message) {
	var cb = arguments[arguments.length-1];
	if (spark.request.threadMessage.user.id !== spark.request.user.id) {
		var err = {
			message: 'User is not authorized'
		};
		spark.status(403).error(err, message);
		return cb(err);
	}
	cb();
};