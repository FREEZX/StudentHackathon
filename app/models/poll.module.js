'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Poll Schema
 */
var PollSchema = new Schema({
	title: {
		type: String,
		trim: true,
		required: true
	},
	description: {
		type: String,
		trim: true,
		required: true
	},
	type: {
		type: String,
		enum: ['single', 'multiple'],
		required: true
	},
	answers: [{
		type: String,
		required: true
	}],
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	created: {
		type: Date,
		default: Date.now,
		required: true
	},
	end: {
		type: Date,
		default: Date.now,
		required: true
	}
});

PollSchema.index({created: -1});

mongoose.model('Poll', PollSchema);