'use strict';
var m = require('mithril.elements');
var _ = require('lodash');

var ThreadStore = {
	loggedin: m.prop(false),
	forumthreads: Array
};

ThreadStore.newThread = function(forumthread){
	m.startComputation();
	primus.request('/forumthread/create', forumthread).then(function(data){
		data.user = ThreadStore.loggedin();
		ThreadStore.forumthreads.unshift(data);
		m.endComputation();
		m.route('/forum');
	});
};

ThreadStore.loadThreads = function(){
	m.startComputation();
	primus.request('/forumthread/list').then(function(data){
		ThreadStore.forumthreads = data; 
		m.endComputation();
	});
};

ThreadStore.deleteThread = function(id){
	m.startComputation();
	primus.request('/forumthread/delete/'+id).then(function(data){
		ThreadStore.forumthreads = _.remove(ThreadStore.forumthreads, function(forumthread){
			if(forumthread._id !== id){
				return true;
			}
		});
		m.endComputation();
	});
};

ThreadStore.findThreadname = function(id) {
	var forumthreads = ThreadStore.forumthreads;
	for(var i=0;i<forumthreads.length;i++){
		if(forumthreads[i]._id==id){
			return forumthreads[i].title;
		}
	}

};


ThreadStore.loadThreads();

module.exports = ThreadStore;
