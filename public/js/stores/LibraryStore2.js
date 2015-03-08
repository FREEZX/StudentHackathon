'use strict';
var m = require('mithril.elements');
var _ = require('lodash');

var LibraryStore = {
	loggedin: m.prop(false),
	library: Array
};

LibraryStore.newLibrary= function(library){
	m.startComputation();
	primus.request('/files/create', library).then(function(data){
		data.user = LibraryStore.loggedin();
		LibraryStore.library.push(data);
		m.endComputation();
	});
};

LibraryStore.loadLibrary = function(){
	m.startComputation();
	primus.request('/files/list').then(function(data){
		LibraryStore.library = data; 
		m.endComputation();
	});
};

LibraryStore.deleteLibrary = function(id){
	m.startComputation();
	primus.request('/threadmessages/delete/'+id).then(function(data){
		LibraryStore.library = _.remove(LibraryStore.library, function(library){
			if(library._id !== id){
				return true;
			}
		});
		m.endComputation();
	});
};

LibraryStore.loadLibrary();

module.exports = LibraryStore;
