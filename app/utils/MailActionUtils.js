var MailThreadActionCreators = require('../actions/MailThreadActionCreators');
var CheckedEmailStore = require('../stores/CheckedEmailStore');
var EmailStore = require('../stores/EmailStore');

var actionMap = {
  'isRead': 'markThread',
  'isStarred': 'clickStar'
};

var handleThread = function(boxName, attr, value) {
  var mail;
  var id;
  var checkedMails = CheckedEmailStore.getCheckedMails(boxName);

  for (id in checkedMails) {
    if ({}.hasOwnProperty.call(checkedMails, id)) {
      mail = EmailStore.get(boxName, id);
      if (mail[attr] === value) {
        continue;
      }
      MailThreadActionCreators[actionMap[attr]]({
        name: boxName,
        id: id,
        val: value
      });
    }
  }
};

module.exports.markThread = function(boxName, value) {
  handleThread(boxName, 'isRead', value);
};

module.exports.clickStar = function(boxName, value) {
  handleThread(boxName, 'isStarred', value);
};

module.exports.delete = function(boxName) {
  var checkedMails = CheckedEmailStore.getCheckedMails(boxName);
  var id;

  for (id in checkedMails) {
    if ({}.hasOwnProperty.call(checkedMails, id)) {
      MailThreadActionCreators.delete({
        name: boxName,
        id: id
      });
    }
  }
};
