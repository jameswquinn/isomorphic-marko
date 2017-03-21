var template = require('./layout.marko');
var assets = require('../../../assets');

module.exports = function(req, res) {

  let context = req.context.assign({
    assets: assets.home,
    initCount: 10
  });

  res.marko(template, context);
};
