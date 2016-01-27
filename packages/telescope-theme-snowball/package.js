Package.describe({
  summary: "Telescope snowball theme",
  version: '0.0.1',
  name: "telescope-theme-snowball"
});

Package.onUse(function (api) {

  api.use(['fourseven:scss', 'templating'], ['client']);
  api.use(['telescope:core'], ['client', 'server']);

  api.addFiles([
    'lib/shared_methods/method_subscribe_to_channel.js',
    'lib/channels.js',
    'lib/menus.js',
    'lib/snowball_config.js',
    'lib/modules.js'
  ], ['client', 'server']);

  api.addFiles([
    //scss
    'lib/client/stylesheets/snowball.scss',
    //templates
    'lib/client/templates/mobile-menu.html'
  ], ['client']);

  //api.export([
  //  'myVariable',
  //  'myFunction'
  //]);

  //api.addAssets([
  //  'public/img/default-avatar.png',
  //  'public/img/loading-balls.svg',
  //  'public/img/loading.svg',
  //], 'client');

});
