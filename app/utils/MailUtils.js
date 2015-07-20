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
    var thisYear = moment().get('year');

    if (date.get('year') === thisYear) {
      return date.format('MMM DD');
    }
    return date.format('YYYY/MM/DD');
  }

};
