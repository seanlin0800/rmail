var React = require('react');
var Router = require('react-router');
var ListenerMixin = require('alt/mixins/ListenerMixin');

var Site = require('../constants/Site');
var EmailStore = require('../stores/EmailStore');
var BoxStore = require('../stores/BoxStore');
var MailUtils = require('../utils/MailUtils');
var EmailList = require('./EmailList');

var Mailbox = React.createClass({

  mixins: [Router.State, ListenerMixin],

  getInitialState: function() {
    return this._getStateFromStores(this.getParams().name);
  },

  componentDidMount: function() {
    document.title = MailUtils.formatBoxName(this.getParams().name);
    this.listenTo(EmailStore, this._onChange);
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState(this._getStateFromStores(nextProps.params.name));
  },

  componentDidUpdate: function() {
    document.title = MailUtils.formatBoxName(this.getParams().name);
  },

  componentWillUnmount: function() {
    document.title = Site.TITLE;
  },

  _getStateFromStores: function(boxName) {
    var box = BoxStore.get(boxName);
    return {emails: box.emails};
  },

  _onChange: function() {
    this.setState(this._getStateFromStores(this.getParams().name));
  },

  render: function() {
    return (
      <div>
        <EmailList
          emails={this.state.emails}
          boxName={this.getParams().name} />
      </div>
    );
  }

});

module.exports = Mailbox;
