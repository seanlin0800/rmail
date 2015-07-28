var React = require('react');
var Router = require('react-router');
var ListenerMixin = require('alt/mixins/ListenerMixin');

var Site = require('../constants/Site');
var MailUtils = require('../utils/MailUtils');
var MailThreadActionCreators = require('../actions/MailThreadActionCreators');
var EmailStore = require('../stores/EmailStore');
var StarWidget = require('./StarWidget');

var Email = React.createClass({

  propTypes: {
    mail: React.PropTypes.object
  },

  mixins: [Router.State, ListenerMixin],

  getInitialState: function() {
    var id = this.getParams().id;
    var name = this.getParams().name;
    return this._getStateFromStores(name, id);
  },

  componentDidMount: function() {
    this.listenTo(EmailStore, this._onChange);
    this._updateTitle();
    this._markRead();
  },

  componentWillReceiveProps: function(nextProps) {
    var id = nextProps.params.id;
    var name = nextProps.params.name;
    this.setState(this._getStateFromStores(name, id));
  },

  componentDidUpdate: function() {
    this._updateTitle();
    this._markRead();
  },

  componentWillUnmount: function() {
    document.title = Site.TITLE;
  },

  _getStateFromStores: function(name, id) {
    return {
      mail: EmailStore.get(name, id)
    };
  },

  _updateTitle: function() {
    if (!this.state.mail) {
      return;
    }
    document.title = this.state.mail.subject;
  },

  _markRead: function() {
    if (!this.state.mail || this.state.mail.isRead) {
      return;
    }
    MailThreadActionCreators.markThread(
      this.getParams().name,
      this.getParams().id,
      true
    );
  },

  _onChange: function() {
    this.setState(this._getStateFromStores(
      this.getParams().name,
      this.getParams().id
    ));
  },

  render: function() {
    var mail = this.state.mail;

    if (!mail) {
      return null;
    }

    return (
      <div>
        <h2>{mail.subject}</h2>
        <div className="email">
          <div className="row">
            <div className="col-md-10">
              {mail.from}
            </div>
            <div className="col-md-2">
              <StarWidget
                mail={this.state.mail}
                boxName={this.getParams().name} />
              {MailUtils.formatDate(mail.date)}
            </div>
          </div>
          <div className="to">to {mail.to}</div>
        </div>
        <div
          className="body"
          dangerouslySetInnerHTML={{__html: mail.body}} />
      </div>
    );
  }

});

module.exports = Email;
