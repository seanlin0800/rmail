var alt = require('../alt');

var MailThreadActionCreators = require('../actions/MailThreadActionCreators');
var ServerActionCreators = require('../actions/ServerActionCreators');

function EmailStore() {
  this.bindActions(MailThreadActionCreators);
  this.bindActions(ServerActionCreators);

  this.mailData = {};

  this.exportPublicMethods({

    getAll: function() {
      return this.getState().mailData;
    },

    get: function(name, id) {
      return this.getState().mailData[name].emails[parseInt(id, 10)];
    }

  });
}

EmailStore.prototype.onReceiveAll = function(data) {
  var box = null;
  var i;
  var len = data.length;

  for (i = 0; i < len; i++) {
    box = data[i];
    if (!this.mailData[box.name]) {
      this.mailData[box.name] = this._convert(box);
    }
  }
};

EmailStore.prototype.onMarkThread = function(obj) {
  this._markThread(obj);
};

EmailStore.prototype.onDelete = function(obj) {
  delete this.mailData[obj.name].emails[obj.id];
};

EmailStore.prototype.onClickStar = function(obj) {
  var mail = this._get(this.mailData, obj.name, obj.id);
  mail.isStarred = !obj.val;
};

EmailStore.prototype.onSendMailSuccess = function(obj) {
  this.mailData.sent.emails[obj.id] = obj;
};

EmailStore.prototype._markThread = function(obj) {
  var mail = this._get(this.mailData, obj.name, obj.id);
  mail.isRead = obj.val;
};

EmailStore.prototype._convert = function(box) {
  return {
    id: box.id,
    name: box.name,
    emails: this._toObj(box.emails)
  };
};

EmailStore.prototype._toObj = function(list) {
  var result = {};
  var i;
  var len = list.length;

  for (i = 0; i < len; i++) {
    result[list[i].id] = list[i];
  }

  return result;
};

EmailStore.prototype._get = function(obj, name, id) {
  return obj[name].emails[id];
};

module.exports = alt.createStore(EmailStore, 'EmailStore');
