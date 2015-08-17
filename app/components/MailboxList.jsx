var React = require('react');
var ListenerMixin = require('alt/mixins/ListenerMixin');

var BoxStore = require('../stores/BoxStore');
var MailboxTab = require('./MailboxTab');

var MailboxList = React.createClass({

  mixins: [ListenerMixin],

  getInitialState: function() {
    return this._getStateFromStores();
  },

  componentDidMount: function() {
    this.listenTo(BoxStore, this._onChange);
  },

  _getStateFromStores: function() {
    return {
      mailboxes: BoxStore.getAll()
    };
  },

  _onChange: function() {
    this.setState(this._getStateFromStores());
  },

  render: function() {
    var mailboxList = Object.keys(this.state.mailboxes).map(function(name) {
      return (
        <MailboxTab
          key={this.state.mailboxes[name].id}
          name={name}
          unreadCount={this.state.mailboxes[name].unreadCount} />
      );
    }.bind(this));

    return (
      <div className="mailbox-list">
        <ul className="list-group">
          {mailboxList}
        </ul>
      </div>
    );
  }

});

module.exports = MailboxList;
