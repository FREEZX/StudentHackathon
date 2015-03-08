'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.controller'),
	File = mongoose.model('File'),
	_ = require('lodash');

/**
 * Create a article
 */
exports.create = function(spark, message) {
	var file = new File(message.data);
	file.user = spark.request.user;

	file.save(function(err) {
		if (err) {
			return spark.status(400).error({
				message: errorHandler.getErrorMessage(err)
			}, message);
		} else {
			spark.response(file, message);
		}
	});
};

/**
 * Show the current file
 */
exports.read = function(spark, message) {
	spark.response(spark.request.file, message);
};

/**
 * Update a file
 */
exports.update = function(spark, message) {
	var file = spark.request.file;

	file = _.extend(file, message.data);

	file.save(function(err) {
		if (err) {
			return spark.status(400).error({
				message: errorHandler.getErrorMessage(err)
			}, message);
		} else {
			spark.response(file, message);
		}
	});
};

/**
 * Delete an file
 */
exports.delete = function(spark, message) {
	var file = spark.request.file;

	file.remove(function(err) {
		if (err) {
			return spark.status(400).error({
				message: errorHandler.getErrorMessage(err)
			}, message);
		} else {
			spark.response(file, message);
		}
	});
};

/**
 * List of Articles
 */
exports.list = function(spark, message) {
	File.find().sort('-created').limit(30).populate('user', 'displayName').exec(function(err, files) {
		if (err) {
			return spark.status(400).error({
				message: errorHandler.getErrorMessage(err)
			}, message);
		} else {
			spark.response(files, message);
		}
	});
};

/**
 * Article middleware
 */
exports.fileByID = function(spark, message, id, cb) {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		var err = {
			message: 'File is invalid'
		};
		spark.status(400).error(err, message);

		return cb(err);
	}

	File.findById(id).populate('user', 'displayName').exec(function(err, file) {
		if (err) return cb(err);
		if (!file) {
			err = {
  				message: 'File not found'
  			};
  			console.log(message);
			return spark.status(404).error(err, message);
		}
		spark.request.file = file;
		cb();
	});
};

/**
 * File authorization middleware
 */
exports.hasAuthorization = function(spark, message) {
	var cb = arguments[arguments.length-1];
	if (spark.request.file.user.id !== spark.request.user.id) {
		var err = {
			message: 'User is not authorized'
		};
		spark.status(403).error(err, message);
		return cb(err);
	}
	cb();
};