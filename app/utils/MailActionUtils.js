var MailThreadActionCreators = require('../actions/MailThreadActionCreators');
var CheckedEmailStore = require('../stores/CheckedEmailStore');
var EmailStore = require('../stores/EmailStore');

var actionMap = {
  'isRead': 'markThread',
  'isStarred': 'clickStar'
};

var handleThread = function(boxName, attr, value) {
  var mail;
  var i;
  var checkedMails = CheckedEmailStore.getCheckedMails(boxName);
  var len = checkedMails.length;

  for (i = 0; i < len; i++) {
    mail = EmailStore.get(boxName, checkedMails[i]);
    if (mail[attr] === value) {
      continue;
    }
    MailThreadActionCreators[actionMap[attr]]({
      name: boxName,
      id: checkedMails[i],
      val: value
    });
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
  var i;
  var len = checkedMails.length;

  for (i = 0; i < len; i++) {
    MailThreadActionCreators.delete({
      name: boxName,
      id: checkedMails[i]
    });
  }
};
