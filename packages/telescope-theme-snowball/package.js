Package.describe({
  summary: "Telescope snowball theme",
  version: '0.0.1',
  name: "telescope-theme-snowball"
});

Package.onUse(function (api) {

  api.use(['fourseven:scss', 'templating', 'arillo:flow-router-helpers'], ['client']);
  api.use(['telescope:core', 'telescope:notifications'], ['client', 'server']);

  api.addFiles([
    'lib/shared_methods/method_subscribe_to_channel.js',
    'lib/channels.js',
    'lib/menus.js',
    'lib/snowball_config.js',
    'lib/modules.js',
    'lib/client/routes.js'
  ], ['client', 'server']);

  api.addFiles([
    //styles
    'lib/client/stylesheets/snowball.scss',
    'lib/client/colors.js',

    //copy override
    'i18n/en.i18n.json',

    //templates
    ////layout
    'lib/client/templates/sb_layout.html',
    ////mobile menu
    'lib/client/templates/mobile_menu.html',
    'lib/client/templates/mobile_menu.js',
    ////channels
    'lib/client/templates/channels/channels.html',
    'lib/client/templates/channels/channels.js',
    ////main navbar
    'lib/client/templates/main_navbar/header.html',
    'lib/client/templates/main_navbar/nav_to_channels.html',
    ////notifications
    'lib/client/templates/notifications.html',
    'lib/client/templates/notifications.js',
    ////logo template with title override
    'lib/client/templates/sb_logo.html',
    'lib/client/templates/sb_logo.js',
    ////post submit
    'lib/client/templates/sb_post_submit.html',
    'lib/client/templates/sb_post_submit.js'
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
