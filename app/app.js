var React = require('react');

var router = require('./router');
var Api = require('./utils/APIUtils');
var MockData = require('./MockData');

require('./styles/css/bootstrap.css');
require('./styles/css/main.css');

MockData.init();
Api.getBoxData();

router.run(function(Root) {
  React.render(React.createElement(Root), document.getElementById('app'));
});
