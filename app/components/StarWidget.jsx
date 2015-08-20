var React = require('react');
var classNames = require('classnames');

var MailThreadActionCreators = require('../actions/MailThreadActionCreators');

var StarWidget = React.createClass({

  propTypes: {
    mail: React.PropTypes.object,
    boxName: React.PropTypes.string
  },

  _clickHandler: function(e) {
    e.stopPropagation();
    MailThreadActionCreators.clickStar({
      name: this.props.boxName,
      id: this.props.mail.id,
      val: !this.props.mail.isStarred
    });
  },

  render: function() {
    var classes = classNames({
      'star': true,
      'star-lit': this.props.mail.isStarred,
      'star-normal': !this.props.mail.isStarred
    });
    return (
      <div className={classes} onClick={this._clickHandler}>
        &nbsp;
      </div>
    );
  }

});

module.exports = StarWidget;
