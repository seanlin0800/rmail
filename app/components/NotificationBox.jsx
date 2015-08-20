var React = require('react');
var ListenerMixin = require('alt/mixins/ListenerMixin');
var NotificationSystem = require('react-notification-system');

var NotificationStore = require('../stores/NotificationStore');

var NotificationBox = React.createClass({

  mixins: [ListenerMixin],

  componentDidMount: function() {
    this.listenTo(NotificationStore, this._onChange);
  },

  _onChange: function() {
    var notification = {
      message: NotificationStore.getMessage(),
      position: 'tc',
      level: NotificationStore.getLevel(),
      action: NotificationStore.getAction()
    };
    this.refs.notificationSystem.addNotification(notification);
  },

  render: function() {
    return (
      <NotificationSystem ref="notificationSystem" />
    );
  }

});

module.exports = NotificationBox;
