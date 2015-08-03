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

    if (date.get('day') == moment().get('day')) {
      return date.format('h:mm a');
    }

    if (date.get('year') === moment().get('year')) {
      return date.format('MMM DD');
    }

    return date.format('YYYY/MM/DD');
  }

};
