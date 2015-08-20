var ReactTools = require('react-tools');

module.exports = {
  process: function(src, path) {
    if (path.match(/.jsx$/)) {
      return ReactTools.transform(src);
    }
    return src;
  }
};
