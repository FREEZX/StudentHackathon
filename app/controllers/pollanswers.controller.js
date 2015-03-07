'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.controller'),
	PollAnswer = mongoose.model('PollAnswer'),
	_ = require('lodash');

/**
 * Create a pollAnswer
 */
exports.create = function(spark, message) {
	var pollAnswer = new PollAnswer(message.data);
	pollAnswer.user = spark.request.user;

	pollAnswer.save(function(err) {
		if (err) {
			console.log(err);
			return spark.status(400).error({
				message: errorHandler.getErrorMessage(err)
			}, message);
		} else {
			spark.response(pollAnswer, message);
		}
	});
};

/**
 * Show the current pollAnswer
 */
exports.read = function(spark, message) {
	spark.response(spark.request.pollAnswer, message);
};

/**
 * Update a pollAnswer
 */
exports.update = function(spark, message) {
	var pollAnswer = spark.request.pollAnswer;

	pollAnswer = _.extend(pollAnswer, message.data);

	pollAnswer.save(function(err) {
		if (err) {
			return spark.status(400).error({
				message: errorHandler.getErrorMessage(err)
			}, message);
		} else {
			spark.response(pollAnswer, message);
		}
	});
};

/**
 * Delete an pollAnswer
 */
exports.delete = function(spark, message) {
	var pollAnswer = spark.request.pollAnswer;

	pollAnswer.remove(function(err) {
		if (err) {
			return spark.status(400).error({
				message: errorHandler.getErrorMessage(err)
			}, message);
		} else {
			spark.response(pollAnswer, message);
		}
	});
};

/**
 * List of PollAnswers
 */
exports.list = function(spark, message) {
	PollAnswer.find().sort('-created').limit(30).populate('user', 'displayName').exec(function(err, pollAnswers) {
		if (err) {
			return spark.status(400).error({
				message: errorHandler.getErrorMessage(err)
			}, message);
		} else {
			spark.response(pollAnswers, message);
		}
	});
};

/**
 * PollAnswer middleware
 */
exports.pollAnswerByID = function(spark, message, id, cb) {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		var err = {
			message: 'PollAnswer is invalid'
		};
		spark.status(400).error(err, message);

		return cb(err);
	}

	PollAnswer.findById(id).populate('user', 'displayName').exec(function(err, pollAnswer) {
		if (err) return cb(err);
		if (!pollAnswer) {
			err = {
  				message: 'PollAnswer not found'
  			};
  			console.log(message);
			return spark.status(404).error(err, message);
		}
		spark.request.pollAnswer = pollAnswer;
		cb();
	});
};

/**
 * PollAnswer authorization middleware
 */
exports.hasAuthorization = function(spark, message) {
	var cb = arguments[arguments.length-1];
	if (spark.request.pollAnswer.user.id !== spark.request.user.id) {
		var err = {
			message: 'User is not authorized'
		};
		spark.status(403).error(err, message);
		return cb(err);
	}
	cb();
};