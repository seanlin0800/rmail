var React = require('react');
var SplitButton = require('react-bootstrap').SplitButton;
var MenuItem = require('react-bootstrap').MenuItem;
var classNames = require('classnames');

var ActionButton = require('./ActionButton');
var MailThreadActionCreators = require('../actions/MailThreadActionCreators');
var ActionApi = require('../utils/MailActionUtils');

var MailboxToolbar = React.createClass({

  propTypes: {
    boxName: React.PropTypes.string,
    emails: React.PropTypes.object,
    checkedMails: React.PropTypes.object
  },

  _select: function(attr, attrValue) {
    var mails = this.props.emails;
    var id;
    var mailList = [];
    var checked;

    for (id in mails) {
      if ({}.hasOwnProperty.call(mails, id)) {
        checked = true;
        if (attr && mails[id][attr] !== attrValue) {
          checked = false;
        }
        mailList.push({
          id: id,
          isChecked: checked
        });
      }
    }
    return this._createCheckAction.bind(null, mailList);
  },

  _selectNone: function() {
    MailThreadActionCreators.uncheckAll({
      name: this.props.boxName
    });
  },

  _createCheckAction: function(mailList) {
    MailThreadActionCreators.addCheck({
      name: this.props.boxName,
      mailList: mailList
    });
  },

  _renderCheckBox: function(checkedNum) {
    var mailNum = Object.keys(this.props.emails).length;
    var classes = classNames({
      'checkbox-content': true,
      'partial': checkedNum > 0 && checkedNum < mailNum,
      'checked': checkedNum > 0 && checkedNum === mailNum
    });

    return (
      <div className="checkbox">
        <div className={classes} />
      </div>
    );
  },

  _renderButton: function(checkedNum) {
    var handler;

    if (checkedNum === 0) {
      return null;
    }

    handler = ActionApi.delete.bind(null, this.props.boxName);
    return (
      <button className="btn btn-danger" onClick={handler}>
        <span className="glyphicon glyphicon-trash" />
      </button>
    );
  },

  render: function() {
    var checkedNum = Object.keys(this.props.checkedMails).length;
    var handler = checkedNum > 0 ? this._selectNone : this._select(null, true);

    return (
      <div className="toolbar">
        <SplitButton onClick={handler} title={this._renderCheckBox(checkedNum)}>
          <MenuItem onClick={this._select(null, true)}>All</MenuItem>
          <MenuItem onClick={this._selectNone}>None</MenuItem>
          <MenuItem onClick={this._select('isRead', true)}>Read</MenuItem>
          <MenuItem onClick={this._select('isRead', false)}>Unread</MenuItem>
          <MenuItem onClick={this._select('isStarred', true)}>Starred</MenuItem>
          <MenuItem onClick={this._select('isStarred', false)}>Unstarred</MenuItem>
        </SplitButton>
        {this._renderButton(checkedNum)}
        <ActionButton
          boxName={this.props.boxName}
          checkedNum={checkedNum}
        />
      </div>
    );
  }

});

module.exports = MailboxToolbar;
