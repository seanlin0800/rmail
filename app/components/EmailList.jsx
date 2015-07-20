var React = require('react');
var ListenerMixin = require('alt/mixins/ListenerMixin');

var ContextMenuStore = require('../stores/ContextMenuStore');
var ContextMenu = require('./ContextMenu');
var EmailListItem = require('./EmailListItem');

var EmailList = React.createClass({

  propTypes: {
    boxName: React.PropTypes.string,
    emails: React.PropTypes.object
  },

  mixins: [ListenerMixin],

  getInitialState: function() {
    return this._getStateFromStores();
  },

  componentDidMount: function() {
    this.listenTo(ContextMenuStore, this._onChange);
  },

  _getStateFromStores: function() {
    return {
      isMenuActive: ContextMenuStore.isMenuActive(),
      menuState: ContextMenuStore.getMenuState()
    };
  },

  _renderContextMenu: function() {
    var menu = null;
    var mails = this.props.emails;

    if (this.state.isMenuActive) {
      menu = (
        <ContextMenu
          boxName={this.props.boxName}
          status={this.state.menuState}
          mail={mails[this.state.menuState.id]} />
      );
    }

    return menu;
  },

  _onChange: function() {
    this.setState(this._getStateFromStores());
  },

  render: function() {
    var mails = this.props.emails;
    var idList = Object.keys(mails).sort(function(a, b) {
      return b - a;
    });
    var mailList = idList.map(function(id) {
      return (
        <EmailListItem
          key={id}
          id={id}
          mail={mails[id]}
          boxName={this.props.boxName} />
      );
    }.bind(this));

    return (
      <table className="email-list table">
        <tbody>
          {mailList}
        </tbody>
        {this._renderContextMenu()}
      </table>
    );
  }

});

module.exports = EmailList;
