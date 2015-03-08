'use strict';
var m = require('mithril.elements');
var _ = require('lodash');

var LibraryStorage = {
	loggedin: m.prop(false),
	libraryStorage: Array
};

LibraryStorage.newLibraryStorage= function(libraryStorage){
	m.startComputation();
	primus.request('/lybrary/create', libraryStorage).then(function(data){
		data.user = LibraryStorage.loggedin();
		LibraryStorage.libraryStorage.push(data);
		m.endComputation();
	});
};

LibraryStorage.loadLibraryStorage = function(){
	m.startComputation();
	primus.request('/library/').then(function(data){
		LibraryStorage.libraryStorage = data; 
		m.endComputation();
	});
};

LibraryStorage.deleteLibraryStorage = function(id){
	m.startComputation();
	primus.request('/threadmessages/delete/'+id).then(function(data){
		LibraryStorage.libraryStorage = _.remove(LibraryStorage.libraryStorage, function(libraryStorage){
			if(libraryStorage._id !== id){
				return true;
			}
		});
		m.endComputation();
	});
};

LibraryStorage.loadLibraryStorage();

module.exports = LibraryStorage;
