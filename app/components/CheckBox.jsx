var React = require('react');
var classNames = require('classnames');
var ListenerMixin = require('alt/mixins/ListenerMixin');

var CheckedEmailStore = require('../stores/CheckedEmailStore');
var MailThreadActionCreators = require('../actions/MailThreadActionCreators');

var CheckBox = React.createClass({

  propTypes: {
    boxName: React.PropTypes.string,
    mail: React.PropTypes.object
  },

  mixins: [ListenerMixin],

  getInitialState: function() {
    return this._getStateFromStores(this.props);
  },

  componentDidMount: function() {
    this.listenTo(CheckedEmailStore, this._onChange);
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState(this._getStateFromStores(nextProps));
  },

  _onChange: function() {
    this.setState(this._getStateFromStores(this.props));
  },

  _handleClick: function(e) {
    e.stopPropagation();
    MailThreadActionCreators.addCheck({
      name: this.props.boxName,
      mailList: [{
        id: this.props.mail.id,
        isChecked: !this.state.isChecked
      }]
    });
  },

  _getStateFromStores: function(props) {
    return {
      isChecked: CheckedEmailStore.isChecked(
        props.boxName,
        props.mail.id
      )
    };
  },

  render: function() {
    var classes = classNames({
      'checkbox-content': true,
      'checked': this.state.isChecked
    });

    return (
      <div
        className="checkbox"
        onClick={this._handleClick}>
        <div className={classes} />
      </div>
    );
  }

});

module.exports = CheckBox;
