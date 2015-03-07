'use strict';
var m = require('mithril.elements');
var _ = require('lodash');

var PollStore = {
	loggedin: m.prop(false),
	polls: []
};

/*PollStore.newThread = function(forumthread){
	m.startComputation();
	primus.request('/forumthread/create', forumthread).then(function(data){
		data.user = PollStore.loggedin();
		PollStore.polls.unshift(data);
		m.endComputation();
	});
};*/

PollStore.loadPolls = function(){
	primus.request('/polls/list').then(function(data){
		m.startComputation();
		PollStore.polls = data; 
		m.endComputation();
	});
};

/*PollStore.deleteThread = function(id){
	m.startComputation();
	primus.request('/forumthread/delete/'+id).then(function(data){
		PollStore.polls = _.remove(PollStore.polls, function(forumthread){
			if(forumthread._id !== id){
				return true;
			}
		});
		m.endComputation();
	});
};*/


PollStore.loadPolls();

module.exports = PollStore;
