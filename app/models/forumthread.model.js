'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * FormThread Schema
 */
var ForumThread = new Schema({
	title: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	comments_count: {
		type: Number,
		required: true
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	tags: [{
		type: String
	}],
	created: {
		type: Date,
		default: Date.now
	},
	updated: {
		type: Date,
		default: Date.now
	}
});

ForumThread.index({created: -1});
ForumThread.index({updated: -1});

mongoose.model('ForumThread', ForumThread);