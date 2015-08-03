var alt = require('../alt');

var MailThreadActionCreators = require('../actions/MailThreadActionCreators');
var ServerActionCreators = require('../actions/ServerActionCreators');
var EmailStore = require('./EmailStore');

function BoxStore() {
  this.bindActions(MailThreadActionCreators);
  this.bindActions(ServerActionCreators);

  this.boxData = {};

  this.exportPublicMethods({

    getAll: function() {
      return this.getState().boxData;
    },

    get: function(name) {
      return this.getState().boxData[name];
    }

  });
}

BoxStore.prototype.onReceiveAll = function() {
  var data;
  var prop;
  var box;

  this.waitFor([EmailStore.dispatchToken]);
  data = EmailStore.getAll();

  for (prop in data) {
    if (!data.hasOwnProperty(prop)) {
      continue;
    }
    box = data[prop];
    if (!this.boxData[box.name]) {
      this.boxData[box.name] = this._convert(box);
    }
  }
};

BoxStore.prototype.onMarkThread = function(obj) {
  this._updateCount(obj.name);
};

BoxStore.prototype.onDelete = function(obj) {
  this._updateCount(obj.name);
};

BoxStore.prototype.onSendMailSuccess = function() {
  this._updateCount('sent');
};

BoxStore.prototype._convert = function(box) {
  return {
    id: box.id,
    unreadCount: this._getUnreadCount(box.emails)
  };
};

BoxStore.prototype._updateCount = function(name) {
  var box;

  this.waitFor([EmailStore.dispatchToken]);
  box = EmailStore.getBox(name);
  this.boxData[name].unreadCount = this._getUnreadCount(
    box.emails
  );
};

BoxStore.prototype._getUnreadCount = function(emails) {
  return Object.keys(emails).reduce(function(count, id) {
    return !emails[id].isRead ? count + 1 : count;
  }, 0);
};

module.exports = alt.createStore(BoxStore, 'BoxStore');
