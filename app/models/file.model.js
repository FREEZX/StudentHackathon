'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Article Schema
 */
var FileSchema = new Schema({
	name: {
		type: String,
		default: '',
		trim: true,
		required: 'Name cannot be blank'
	},
	file_id: {
		type: String
	},
	type: {
		type: String,
		enum: ['folder', 'file'],
		default: 'file',
		required: true
	},
	parent: {
		type: Schema.ObjectId,
		ref: 'File'
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
	}
});

FileSchema.index({created: -1});

mongoose.model('File', FileSchema);