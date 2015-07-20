var React = require('react');

var NoneSelected = {

  create: function(text) {
    return React.createClass({

      render: function() {
        return (
          <div className="none-selected alert alert-warning" role="alert">
            <span>No {text} selected.</span>
          </div>
        );
      }

    });
  }

};

module.exports = NoneSelected;
