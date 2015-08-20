var alt = require('../alt');

var router = require('../router');
var ServerActionCreators = require('../actions/ServerActionCreators');
var EmailStore = require('./EmailStore');

var noop = function() {};

function NotificationStore() {
  this.bindActions(ServerActionCreators);

  this.message = '';
  this.level = 'sucess';
  this.action = {};

  this.exportPublicMethods({

    getMessage: function() {
      return this.getState().message;
    },

    getAction: function() {
      return this.getState().action;
    },

    getLevel: function() {
      return this.getState().level;
    }

  });
}

NotificationStore.prototype.onSendMailSuccess = function(obj) {
  this.waitFor([EmailStore.dispatchToken]);
  this.message = 'Your message has been sent';
  this.level = 'success';
  this.action = {
    label: 'View message',
    callback: function() {
      router.transitionTo('mails', {name: 'sent', id: obj.id});
    }
  };
};

NotificationStore.prototype.onMarkAllSuccess = function(len) {
  this.waitFor([EmailStore.dispatchToken]);
  this.message = len + ' messages have been marked as read.';
  this.level = 'success';
  this.action = {
    label: 'Ok',
    callback: noop
  };
};

NotificationStore.prototype.onMarkAllCanceled = function() {
  this.waitFor([EmailStore.dispatchToken]);
  this.message = 'No unread messages';
  this.level = 'error';
  this.action = {
    label: 'Ok',
    callback: noop
  };
};

module.exports = alt.createStore(NotificationStore, 'NotificationStore');
