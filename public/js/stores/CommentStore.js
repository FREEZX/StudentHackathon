'use strict';
var m = require('mithril.elements');
var _ = require('lodash');

var CommentStore = {
	loggedin: m.prop(false),
	comments: Array
};

CommentStore.newComment= function(comment){
	m.startComputation();
	primus.request('/threadmessages/create', comment).then(function(data){
		data.user = CommentStore.loggedin();
		CommentStore.comments.push(data);
		m.endComputation();
	});
};

CommentStore.loadComments = function(id){
	m.startComputation();
	primus.request('/threadmessages/list?thread='+id).then(function(data){
		CommentStore.comments = data; 
		m.endComputation();
	});
};

CommentStore.deleteComment = function(id){
	m.startComputation();
	primus.request('/threadmessages/delete/'+id).then(function(data){
		CommentStore.comments = _.remove(CommentStore.comments, function(comments){
			if(comments._id !== id){
				return true;
			}
		});
		m.endComputation();
	});
};

module.exports = CommentStore;
