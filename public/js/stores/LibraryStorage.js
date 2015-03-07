'use strict';
var m = require('mithril.elements');
var _ = require('lodash');

var LibraryStorage = {
  loggedin: m.prop(false),
  libraryStorage: []
};

LibraryStorage.loadLibrary = function(){
  m.startComputation();
  // primus.request('/article/list').then(function(data){
  //   LibraryStore.articles = data; 
  //   m.endComputation();
  // });
  LibraryStorage.libraryStorage = [
    {
      _id: '0',
      file: 'false',
      name: 'Аудиториски вежби'
    },
    {
      _id: '1',
      file: 'false',
      name: 'Предавања'
    },
    {
      _id: '2',
      file: 'false',
      name: 'Лабораториски вежби'
    },
    {
      _id: '3',
      file: 'true',
      name: 'Распоред на часови'
    },
    {
      _id: '4',
      file: 'true',
      name: 'Општи информации'
    }
  ];

  m.endComputation();
};

LibraryStorage.loadLibrary();

module.exports = LibraryStorage;