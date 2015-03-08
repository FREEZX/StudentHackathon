var _ = require('lodash');
var m = require('mithril.elements');

var ChatStore = {
	chatMessages: [],
	_joined: false
}

ChatStore.join = function(){
	if(!this._joined){
		primus.request('/chat/join');
		this._joined = true;
		primus.on('data', function(data){
			if(data.action && data.action === 'chatmessage'){
				ChatStore.chatMessages.push(data.data);
				m.redraw();
			}
		});
	}
}

ChatStore.send = function(message){
	primus.request('/chat/create', {message: message})
	.then(function(data){
		// ChatStore.chatMessages.push(data);
	});
}

module.exports = ChatStore;