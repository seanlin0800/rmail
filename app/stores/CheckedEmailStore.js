var alt = require('../alt');

var MailThreadActionCreators = require('../actions/MailThreadActionCreators');
var ContextMenuActionCreators = require('../actions/ContextMenuActionCreators');
var EmailStore = require('./EmailStore');

function CheckedEmailStore() {
  this.bindActions(MailThreadActionCreators);
  this.bindActions(ContextMenuActionCreators);

  this.checkedMails = {
    inbox: {},
    spam: {},
    sent: {}
  };

  this.exportPublicMethods({

    getCheckedMails: function(boxName) {
      return this.getState().checkedMails[boxName];
    },

    getCountMap: function(boxName) {
      var mails = this.getState().checkedMails[boxName];
      var ids = Object.keys(mails);
      var readCount = 0;
      var starredCount = 0;

      ids.forEach(function(id) {
        var mail = EmailStore.get(boxName, id);
        if (mail.isRead) {
          readCount++;
        }
        if (mail.isStarred) {
          starredCount++;
        }
      });

      return {
        read: readCount,
        unread: ids.length - readCount,
        starred: starredCount,
        unstarred: ids.length - starredCount
      };
    }

  });
}

CheckedEmailStore.prototype.onAddCheck = function(obj) {
  var box = this.checkedMails[obj.name];
  var mail;
  var i;
  var len = obj.mailList.length;

  if (len < 1) {
    return false;
  }

  for (i = 0; i < len; i++) {
    mail = obj.mailList[i];

    if (mail.isChecked) {
      box[mail.id] = true;
    } else {
      delete box[mail.id];
    }
  }
};

CheckedEmailStore.prototype.onUncheckAll = function(obj) {
  this.checkedMails[obj.name] = {};
};

CheckedEmailStore.prototype.onShowMenu = function(obj) {
  var box = this.checkedMails[obj.name];

  if (obj.id in box) {
    return false;
  }

  this.checkedMails[obj.name] = {};
  this.checkedMails[obj.name][obj.id] = true;
};

CheckedEmailStore.prototype.onDelete = function(obj) {
  var box = this.checkedMails[obj.name];
  if (!obj.id in box) {
    return false;
  }
  delete box[obj.id];
};

module.exports = alt.createStore(CheckedEmailStore, 'CheckedEmailStore');
