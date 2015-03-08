'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * PollAnswer Schema
 */
var PollAnswerSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	updated: {
		type: Date,
		default: Date.now
	},
	poll: {
		type: Schema.ObjectId,
		ref: 'Poll'
	},
	answers: [{
		type: String
	}],
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

PollAnswerSchema.index({created: -1});
PollAnswerSchema.index({user: 1, poll: 1}, {unique: true});

mongoose.model('PollAnswer', PollAnswerSchema);