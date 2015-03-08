'use strict';
var m = require('mithril.elements');
var _ = require('lodash');

var PollStore = {
	loggedin: m.prop(false),
	polls: [],
	pollData: {}
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
	m.startComputation();
	primus.request('/polls/list').then(function(data){
		PollStore.polls = data; 
		m.endComputation();
	});
};

PollStore.loadPollData = function(pollId){
	m.startComputation();
	primus.request('/polls/'+pollId).then(function(data){
		PollStore.pollData = data; 
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
