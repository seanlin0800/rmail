var React = require('react');
var SplitButton = require('react-bootstrap').SplitButton;
var MenuItem = require('react-bootstrap').MenuItem;
var classNames = require('classnames');
var ListenerMixin = require('alt/mixins/ListenerMixin');

var ActionButton = require('./ActionButton');
var MailThreadActionCreators = require('../actions/MailThreadActionCreators');
var CheckedEmailStore = require('../stores/CheckedEmailStore');
var ActionApi = require('../utils/MailActionUtils');

var MailboxToolbar = React.createClass({

  propTypes: {
    boxName: React.PropTypes.string,
    emails: React.PropTypes.object
  },

  mixins: [ListenerMixin],

  getInitialState: function() {
    return this._getStateFromStores();
  },

  componentDidMount: function() {
    this.listenTo(CheckedEmailStore, this._onChange);
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      checkedMails: CheckedEmailStore.getCheckedMails(nextProps.boxName)
    });
  },

  _onChange: function() {
    this.setState(this._getStateFromStores());
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
    this._createCheckAction(this.state.checkedMails.map(function(id) {
      return {
        id: id,
        isChecked: false
      };
    }));
  },

  _createCheckAction: function(mailList) {
    MailThreadActionCreators.addCheck({
      name: this.props.boxName,
      mailList: mailList
    });
  },

  _renderCheckBox: function() {
    var mailNum = Object.keys(this.props.emails).length;
    var checkedNum = this.state.checkedMails.length;
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

  _renderButton: function() {
    var handler;

    if (this.state.checkedMails.length === 0) {
      return null;
    }

    handler = ActionApi.delete.bind(null, this.props.boxName);
    return (
      <button className="btn btn-danger" onClick={handler}>
        <span className="glyphicon glyphicon-trash" />
      </button>
    );
  },

  _getStateFromStores: function() {
    return {
      checkedMails: CheckedEmailStore.getCheckedMails(this.props.boxName)
    };
  },

  render: function() {
    var checkedNum = this.state.checkedMails.length;
    var handler = checkedNum > 0 ? this._selectNone : this._select(null, true);

    return (
      <div className="toolbar">
        <SplitButton onClick={handler} title={this._renderCheckBox()}>
          <MenuItem onClick={this._select(null, true)}>All</MenuItem>
          <MenuItem onClick={this._selectNone}>None</MenuItem>
          <MenuItem onClick={this._select('isRead', true)}>Read</MenuItem>
          <MenuItem onClick={this._select('isRead', false)}>Unread</MenuItem>
          <MenuItem onClick={this._select('isStarred', true)}>Starred</MenuItem>
          <MenuItem onClick={this._select('isStarred', false)}>Unstarred</MenuItem>
        </SplitButton>
        {this._renderButton()}
        <ActionButton
          boxName={this.props.boxName}
          checkedMails={this.state.checkedMails}
        />
      </div>
    );
  }

});

module.exports = MailboxToolbar;
