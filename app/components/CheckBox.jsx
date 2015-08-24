var React = require('react');
var classNames = require('classnames');

var MailThreadActionCreators = require('../actions/MailThreadActionCreators');

var CheckBox = React.createClass({

  propTypes: {
    boxName: React.PropTypes.string,
    mail: React.PropTypes.object,
    isChecked: React.PropTypes.bool
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
        isChecked: !this.props.isChecked
      }]
    });
  },

  render: function() {
    var classes = classNames({
      'checkbox-content': true,
      'checked': this.props.isChecked
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
