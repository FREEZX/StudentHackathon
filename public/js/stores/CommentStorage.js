'use strict';
var m = require('mithril.elements');
var _ = require('lodash');

var CommentStorage = {
  loggedin: m.prop(false),
  comments: []
};

CommentStorage.loadLibrary = function(){
  m.startComputation();
  // primus.request('/article/list').then(function(data){
  //   LibraryStore.articles = data; 
  //   m.endComputation();
  // });
  CommentStorage.comments = [
    {
      _id: '0',
      comment: 'Comment1'
    },
    {
      _id: '1',
      comment: 'Comment2'
    }
  ];

  m.endComputation();
};

CommentStorage.loadLibrary();

module.exports = CommentStorage;