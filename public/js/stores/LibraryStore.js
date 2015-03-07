'use strict';
var m = require('mithril.elements');
var _ = require('lodash');

var LibraryStore = {
  loggedin: m.prop(false),
  library: []
};

LibraryStore.loadLibrary = function(){
  m.startComputation();
  // primus.request('/article/list').then(function(data){
  //   LibraryStore.articles = data; 
  //   m.endComputation();
  // });
  LibraryStore.library = [
    {
      _id: '0',
      name: 'Калкулус 1'
    },
    {
      _id: '1',
      name: 'Калкулус 2'
    },
    {
      _id: '2',
      name: 'Бази на податоци'
    },
    {
      _id: '3',
      name: 'Оперативни системи'
    },
    {
      _id: '4',
      name: 'Компјутерски мрежи'
    },
    {
      _id: '5',
      name: 'Калкулус 1'
    }
  ];

  m.endComputation();
};

LibraryStore.loadLibrary();

module.exports = LibraryStore;