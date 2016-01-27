Package.describe({
  summary: "Telescope snowball theme",
  version: '0.0.1',
  name: "telescope-theme-snowball"
});

Package.onUse(function (api) {

  api.use(['fourseven:scss'], ['client']);
  api.use(['telescope:core'], ['client', 'server']);

  api.addFiles([
    'lib/shared_methods/method_subscribe_to_channel.js',
    'lib/channels.js',
    'lib/menus.js',
    'lib/snowball_config.js'
  ], ['client', 'server']);

  api.addFiles([
    'lib/client/stylesheets/snowball.scss',

  ], ['client']);

});
