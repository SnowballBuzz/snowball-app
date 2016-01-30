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
    'lib/shared_methods/update_share_count.js',
    'lib/channels.js',
    'lib/menus.js',
    'lib/snowball_config.js',
    'lib/modules.js',
    'lib/client/routes.js',
    'lib/fields.js'
  ], ['client', 'server']);

  api.addFiles([
    //styles
    'lib/client/stylesheets/snowball.scss',
    'lib/client/colors.js',

    //methods
    'lib/client/methods/methods.js',

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
    'lib/client/templates/main_navbar/nav_to_channels.html',
    'lib/client/templates/main_navbar/nav_to_feed.html',
    ////notifications
    'lib/client/templates/notifications.html',
    'lib/client/templates/notifications.js',
    ////logo template with title override
    'lib/client/templates/sb_logo.html',
    'lib/client/templates/sb_logo.js',
    //post stuff
    'lib/client/templates/sb_post_submit.html',
    'lib/client/templates/sb_post_submit.js',
    'lib/client/templates/sb_post_title.html',
    'lib/client/templates/sb_post_info.html',
    'lib/client/templates/sb_post_vote.html',
    'lib/client/templates/post_tweet.html',
    'lib/client/templates/post_tweet.js'
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
