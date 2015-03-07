'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.controller'),
	ForumThread = mongoose.model('ForumThread'),
	ThreadMessage = mongoose.model('ThreadMessage'),

	_ = require('lodash');

/**
 * Create a forumThread
 */
exports.create = function(spark, message) {
	var fthread = message.data;
	delete fthread.comments_count;
	delete fthread.created;
	delete fthread.updated;
	var forumThread = new ForumThread(fthread);
	forumThread.user = spark.request.user;

	forumThread.save(function(err) {
		if (err) {
			console.log(err);
			return spark.status(400).error({
				message: errorHandler.getErrorMessage(err)
			}, message);
		} else {
			spark.response(forumThread, message);
		}
	});
};

/**
 * Show the current forumThread
 */
exports.read = function(spark, message, id) {
	spark.response(spark.request.article, message);
};

/**
 * Update a forumThread
 */
exports.update = function(spark, message) {
	var forumThread = spark.request.forumThread;

	forumThread = _.extend(forumThread, message.data);

	forumThread.save(function(err) {
		if (err) {
			return spark.status(400).error({
				message: errorHandler.getErrorMessage(err)
			}, message);
		} else {
			spark.response(forumThread, message);
		}
	});
};

/**
 * Delete an forumThread
 */
exports.delete = function(spark, message) {
	var forumThread = spark.request.forumThread;

	forumThread.remove(function(err) {
		if (err) {
			return spark.status(400).error({
				message: errorHandler.getErrorMessage(err)
			}, message);
		} else {
			spark.response(forumThread, message);
		}
	});
};

/**
 * List of ForumThreads
 */
exports.list = function(spark, message) {
	ForumThread.find().sort('-created').limit(30).populate('user', 'displayName').exec(function(err, forumThreads) {
		if (err) {
			return spark.status(400).response({
				message: errorHandler.getErrorMessage(err)
			}, message);
		} else {
			spark.response(forumThreads, message);
		}
	});
};

/**
 * ForumThread middleware
 */
exports.forumThreadByID = function(spark, message, id, cb) {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		var err = {
			message: 'ForumThread is invalid'
		};
		spark.status(400).error(err, message);

		return cb(err);
	}

	ForumThread.findById(id).populate('user', 'displayName').exec(function(err, forumThread) {
		if (err) return cb(err);
		if (!forumThread) {
			err = {
  				message: 'ForumThread not found'
  			};
  			console.log(message);
			return spark.status(404).error(err, message);
		}
		spark.request.forumThread = forumThread;
		cb();
	});
};

/**
 * ForumThread authorization middleware
 */
exports.hasAuthorization = function(spark, message) {
	var cb = arguments[arguments.length-1];
	if (spark.request.forumThread.user.id !== spark.request.user.id) {
		var err = {
			message: 'User is not authorized'
		};
		spark.status(403).error(err, message);
		return cb(err);
	}
	cb();
};