'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Thread Message Schema
 */
var ThreadMessage = new Schema({
	thread: {
		type: Schema.ObjectId,
		ref: 'ForumThread',
		required: true
	},
	reply: {
		type: Schema.ObjectId,
		ref: 'ThreadMessage'
	},
	content: {
		type: String,
		default: '',
		trim: true,
		required: true
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User',
		required: true
	},
	created: {
		type: Date,
		default: Date.now,
		required: true
	},
	updated: {
		type: Date,
		default: Date.now,
		required: true
	},
});

ThreadMessage.index({thread: 1, created: -1});

mongoose.model('ThreadMessage', ThreadMessage);