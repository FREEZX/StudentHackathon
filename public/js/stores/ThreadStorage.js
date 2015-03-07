'use strict';
var m = require('mithril.elements');
var _ = require('lodash');

var ThreadStorage = {
  loggedin: m.prop(false),
  threads: []
};

ThreadStorage.loadLibrary = function(){
  m.startComputation();
  // primus.request('/article/list').then(function(data){
  //   LibraryStore.articles = data; 
  //   m.endComputation();
  // });
  ThreadStorage.threads = [
    {
      _id: '0',
      title: 'Thread1'
    },
    {
      _id: '1',
      title: 'Thread2'
    }
  ];

  m.endComputation();
};

ThreadStorage.loadLibrary();

module.exports = ThreadStorage;