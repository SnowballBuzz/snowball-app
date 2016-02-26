Meteor.startup(function () {
  process.env.METEOR_PKG_SPIDERABLE_PHANTOMJS_ARGS = '--ssl-protocol=tlsv1 --ignore-ssl-errors=yes --debug=true';
});
