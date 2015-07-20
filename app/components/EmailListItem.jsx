var React = require('react');
var Router = require('react-router');
var classNames = require('classnames');

var MailUtils = require('../utils/MailUtils');
var ContextMenuActionCreators = require('../actions/ContextMenuActionCreators');
var StarWidget = require('./StarWidget');

var EmailListItem = React.createClass({

  propTypes: {
    mail: React.PropTypes.object,
    id: React.PropTypes.string,
    boxName: React.PropTypes.string
  },

  mixins: [Router.Navigation],

  _clickThread: function() {
    this.transitionTo('mails', {
      name: this.props.boxName,
      id: this.props.id
    });
  },

  _showContextMenu: function(e) {
    e.preventDefault();
    ContextMenuActionCreators.showMenu({
      xPos: e.clientX,
      yPos: e.clientY,
      id: this.props.id
    });
  },

  render: function() {
    var trClasses = classNames({
      'mail-item': true,
      'active': this.props.mail.isRead
    });

    var textClasses = classNames({
      'unread': !this.props.mail.isRead,
      'read': this.props.mail.isRead
    });

    var starTitle = this.props.mail.isStarred ? 'Starred' : 'Not starred';

    return (
      <tr className={trClasses} onClick={this._clickThread}
          onContextMenu={this._showContextMenu}>
        <td className="bg" />
        <td className="widget" title={starTitle}>
          <StarWidget mail={this.props.mail} boxName={this.props.boxName} />
        </td>
        <td className="from">
          <span className={textClasses}>
            {this.props.mail.from}
          </span>
        </td>
        <td>
          <span className={textClasses}>
            {this.props.mail.subject}
          </span>
          &nbsp;-&nbsp;
          {this.props.mail.body.substring(0, 50)}
        </td>
        <td>
          {MailUtils.formatDate(this.props.mail.date)}
        </td>
      </tr>
    );
  }

});

module.exports = EmailListItem;
