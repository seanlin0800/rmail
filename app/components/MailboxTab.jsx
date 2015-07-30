var React = require('react');
var Router = require('react-router');
var classNames = require('classnames');

var MailUtils = require('../utils/MailUtils');

var MailboxTab = React.createClass({

  propTypes: {
    name: React.PropTypes.string,
    unreadCount: React.PropTypes.number
  },

  mixins: [Router.State, Router.Navigation],

  _handleClick: function() {
    this.transitionTo('mailboxes', {name: this.props.name});
  },

  render: function() {
    var classes = classNames({
      'list-group-item': true,
      'active': this.getParams().name === this.props.name
    });

    return (
      <li className={classes} onClick={this._handleClick}>
        <span className="badge">
          {this.props.unreadCount}
        </span>
        {MailUtils.formatBoxName(this.props.name)}
      </li>
    );
  }

});

module.exports = MailboxTab;
