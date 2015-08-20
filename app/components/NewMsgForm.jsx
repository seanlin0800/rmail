var React = require('react');

var Site = require('../constants/Site');

var NewMsgForm = React.createClass({

  propTypes: {
    updateHandler: React.PropTypes.func
  },

  getInpuValues: function() {
    var recipient = React.findDOMNode(this.refs.recipient).value.trim();
    var subject = React.findDOMNode(this.refs.subject).value.trim();
    var message = React.findDOMNode(this.refs.message).value.trim();

    React.findDOMNode(this.refs.recipient).value = '';
    React.findDOMNode(this.refs.subject).value = '';
    React.findDOMNode(this.refs.message).value = '';

    return {
      // TODO: Implement user store instead of hard-coding
      from: Site.USER,
      to: recipient,
      subject: subject,
      body: message
    };
  },

  _update: function(e) {
    this.props.updateHandler(e.target.value);
  },

  render: function() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="recipient" className="control-label">Recipient:</label>
          <input
            type="text"
            className="form-control"
            id="recipient"
            ref="recipient"
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject" className="control-label">Subject:</label>
          <input
            type="text"
            className="form-control"
            id="subject"
            ref="subject"
            onBlur={this._update}
          />
        </div>
        <div className="form-group">
          <label htmlFor="message" className="control-label">Message:</label>
          <textarea
            className="form-control"
            id="message"
            rows="5"
            ref="message"
          />
        </div>
      </form>
    );
  }

});

module.exports = NewMsgForm;
