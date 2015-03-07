'use strict';
var m = require('mithril.elements');
var _ = require('lodash');

var CommentStore = {
  loggedin: m.prop(false),
  comments: []
};

CommentStore.loadLibrary = function(){
  m.startComputation();
  // primus.request('/article/list').then(function(data){
  //   LibraryStore.articles = data; 
  //   m.endComputation();
  // });
  CommentStore.comments = [
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

CommentStore.loadLibrary();

module.exports = CommentStore;