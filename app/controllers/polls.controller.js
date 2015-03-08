'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.controller'),
	Poll = mongoose.model('Poll'),
	PollAnswer = mongoose.model('PollAnswer'),
	_ = require('lodash');

/**
 * Create a poll
 */
exports.create = function(spark, message) {
	var poll = new Poll(message.data);
	poll.user = spark.request.user;

	poll.save(function(err) {
		if (err) {
			console.log(err);
			return spark.status(400).error({
				message: errorHandler.getErrorMessage(err)
			}, message);
		} else {
			spark.response(poll, message);
		}
	});
};

/**
 * Show the current poll
 */
exports.read = function(spark, message) {
	PollAnswer.find({poll: spark.request.poll}, function(err, answers){
		if (err || !answers) {
			return spark.status(400).error({
				message: errorHandler.getErrorMessage(err)
			}, message);
		}
		var answerSum = {};
		for(var i=0; i<spark.request.poll.answers.length; ++i){
			var filteredAnswers = _.filter(answers, function(answer) {
				return _.includes(answer.answers, spark.request.poll.answers[i]);
			});	
			answerSum[spark.request.poll.answers[i]] = filteredAnswers.length
		}
		var poll = spark.request.poll.toObject();
		poll.summary = answerSum;
		
		spark.response(answerSum, message);
	});
};

/**
 * Update a poll
 */
exports.update = function(spark, message) {
	var poll = spark.request.poll;

	poll = _.extend(poll, message.data);

	poll.save(function(err) {
		if (err) {
			return spark.status(400).error({
				message: errorHandler.getErrorMessage(err)
			}, message);
		} else {
			spark.response(poll, message);
		}
	});
};

/**
 * Delete an poll
 */
exports.delete = function(spark, message) {
	var poll = spark.request.poll;

	poll.remove(function(err) {
		if (err) {
			return spark.status(400).error({
				message: errorHandler.getErrorMessage(err)
			}, message);
		} else {
			spark.response(poll, message);
		}
	});
};

/**
 * List of Polls
 */
exports.list = function(spark, message) {
	Poll.find().sort('-created').limit(30).populate('user', 'displayName').exec(function(err, polls) {
		if (err) {
			return spark.status(400).error({
				message: errorHandler.getErrorMessage(err)
			}, message);
		} else {
			spark.response(polls, message);
		}
	});
};

/**
 * Poll middleware
 */
exports.pollByID = function(spark, message, id, cb) {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		var err = {
			message: 'Poll is invalid'
		};
		spark.status(400).error(err, message);

		return cb(err);
	}

	Poll.findById(id).populate('user', 'displayName').exec(function(err, poll) {
		if (err) return cb(err);
		if (!poll) {
			err = {
  				message: 'Poll not found'
  			};
  			console.log(message);
			return spark.status(404).error(err, message);
		}
		spark.request.poll = poll;
		cb();
	});
};

/**
 * Poll authorization middleware
 */
exports.hasAuthorization = function(spark, message) {
	var cb = arguments[arguments.length-1];
	if (spark.request.poll.user.id !== spark.request.user.id) {
		var err = {
			message: 'User is not authorized'
		};
		spark.status(403).error(err, message);
		return cb(err);
	}
	cb();
};