var React = require('react');
var Router = require('react-router');
var ListenerMixin = require('alt/mixins/ListenerMixin');
var DocumentTitle = require('react-document-title');

var EmailStore = require('../stores/EmailStore');
var MailUtils = require('../utils/MailUtils');
var MailboxToolbar = require('./MailboxToolbar');
var EmailList = require('./EmailList');

var Mailbox = React.createClass({

  mixins: [Router.State, ListenerMixin],

  getInitialState: function() {
    return this._getStateFromStores(this.getParams().name);
  },

  componentDidMount: function() {
    this.listenTo(EmailStore, this._onChange);
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState(this._getStateFromStores(nextProps.params.name));
  },

  _getStateFromStores: function(boxName) {
    var box = EmailStore.getBox(boxName);
    return {emails: box.emails};
  },

  _onChange: function() {
    this.setState(this._getStateFromStores(this.getParams().name));
  },

  render: function() {
    var boxName = this.getParams().name;

    return (
      <DocumentTitle title={MailUtils.formatBoxName(boxName)}>
        <div>
          <MailboxToolbar
            emails={this.state.emails}
            boxName={this.getParams().name} />
          <EmailList
            emails={this.state.emails}
            boxName={this.getParams().name}
          />
        </div>
      </DocumentTitle>
    );
  }

});

module.exports = Mailbox;
