var alt = require('../alt');

var router = require('../router');
var ServerActionCreators = require('../actions/ServerActionCreators');
var EmailStore = require('./EmailStore');

function NotificationStore() {
  this.bindActions(ServerActionCreators);

  this.message = '';
  this.action = {};

  this.exportPublicMethods({

    getMessage: function() {
      return this.getState().message;
    },

    getAction: function() {
      return this.getState().action;
    }

  });
}

NotificationStore.prototype.onSendMailSuccess = function(obj) {
  this.waitFor([EmailStore.dispatchToken]);
  this.message = 'Your message has been sent';
  this.action = {
    label: 'View message',
    callback: function() {
      router.transitionTo('mails', {name: 'sent', id: obj.id});
    }
  };
};

module.exports = alt.createStore(NotificationStore, 'NotificationStore');
