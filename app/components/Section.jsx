var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Section = React.createClass({

  render: function() {
    return (
      <div className="mailbox col-md-10">
        <div className="panel panel-default">
          <div className="panel-body">
            <RouteHandler />
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Section;
