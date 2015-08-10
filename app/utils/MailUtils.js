var moment = require('moment');

var BOXNAME_MAP = {
  'inbox': 'Inbox',
  'spam': 'Spam',
  'sent': 'Sent Mail'
};

module.exports = {

  formatBoxName: function(name) {
    return BOXNAME_MAP[name];
  },

  formatDate: function(dateString) {
    var date = moment(dateString);
    var now = moment();

    if (now.isSame(date, 'day')) {
      return date.format('h:mm a');
    }

    if (now.isSame(date, 'year')) {
      return date.format('MMM DD');
    }

    return date.format('YYYY/MM/DD');
  },

  getUserName: function() {
    var user = JSON.parse(sessionStorage.getItem('user'));
    return user.name;
  },

  isAuth: function() {
    return !!sessionStorage.getItem('user');
  }

};
