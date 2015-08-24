var React = require('react');
var Router = require('react-router');
var classNames = require('classnames');

var MailUtils = require('../utils/MailUtils');
var ContextMenuActionCreators = require('../actions/ContextMenuActionCreators');
var MailThreadActionCreators = require('../actions/MailThreadActionCreators');
var StarWidget = require('./StarWidget');
var CheckBox = require('./CheckBox');

var EmailListItem = React.createClass({

  propTypes: {
    mail: React.PropTypes.object,
    id: React.PropTypes.string,
    boxName: React.PropTypes.string,
    checkedMails: React.PropTypes.object
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
      name: this.props.boxName,
      id: this.props.id
    });
    MailThreadActionCreators.check({
      name: this.props.boxName,
      id: this.props.id
    });
  },

  render: function() {
    var isSelected = this.props.id in this.props.checkedMails;
    var trClasses = classNames({
      'mail-item': true,
      'selected': isSelected,
      'active': !isSelected && this.props.mail.isRead
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
        <td className="widget">
          <CheckBox
            mail={this.props.mail}
            boxName={this.props.boxName}
            isChecked={isSelected}
          />
        </td>
        <td className="widget" title={starTitle}>
          <StarWidget mail={this.props.mail} boxName={this.props.boxName} />
        </td>
        <td className="from">
          <span className={textClasses}>
            {this.props.mail.from}
          </span>
        </td>
        <td className="subject">
          <span className={textClasses}>
            {this.props.mail.subject}
          </span>
          &nbsp;-&nbsp;
          {this.props.mail.body.substring(0, 50)}
        </td>
        <td>
          <span className={textClasses}>
            {MailUtils.formatDate(this.props.mail.date)}
          </span>
        </td>
      </tr>
    );
  }

});

module.exports = EmailListItem;
