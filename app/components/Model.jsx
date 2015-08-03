var React = require('react');
var classNames = require('classnames');

var MailActionCreators = require('../actions/MailActionCreators');
var NewMsgForm = require('./NewMsgForm');

var INI_MSG_TITLE = 'New Message';

var Model = React.createClass({

  propTypes: {
    id: React.PropTypes.number,
    isHidden: React.PropTypes.boolean
  },

  getInitialState: function() {
    return {title: INI_MSG_TITLE};
  },

  _handleClose: function() {
    MailActionCreators.delNewMsgBox(this.props.id);
  },

  _updateTitle: function(text) {
    this.setState({title: text || INI_MSG_TITLE});
  },

  _send: function() {
    MailActionCreators.sendMail(this.refs.form.getInpuValues());
    this._handleClose();
  },

  render: function() {
    var classes = classNames({
      'modal-dialog': true,
      'box': true,
      'hidden': this.props.isHidden
    });
    return (
      <div className={classes}>
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              onClick={this._handleClose}
              aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <h4 className="modal-title">{this.state.title}</h4>
          </div>
          <div className="modal-body">
            <NewMsgForm
              updateHandler={this._updateTitle}
              ref="form" />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={this._send}>
                Send
            </button>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Model;
