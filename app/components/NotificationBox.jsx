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
      level: 'success',
      action: NotificationStore.getAction()
    };
    this.refs.notificationSystem.addNotification(notification);
  },

  render: function() {
    return (
      <div>
        <NotificationSystem ref="notificationSystem" />
      </div>
    );
  }

});

module.exports = NotificationBox;
