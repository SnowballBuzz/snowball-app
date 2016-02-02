Package.describe({
  summary: "Telescope snowball theme",
  version: '0.0.1',
  name: "telescope-theme-snowball"
});

Package.onUse(function (api) {

  api.use([
    'fourseven:scss',
    'templating',
    'arillo:flow-router-helpers',
    'random'
  ], ['client']);
  api.use([
    'telescope:core',
    'telescope:notifications',
    'aldeed:simple-schema',
    'aldeed:autoform'
  ], ['client', 'server']);

  api.addAssets([
    'fonts/Montserrat-Bold.ttf',
    'fonts/OpenSans-Light.ttf',
    'fonts/OpenSans-Semibold.ttf'
  ], ['client']);

  //functions & methods
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
    'lib/client/templates/channels/sb_categories_admin.html',
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
    'lib/client/templates/posts/sb_post_submit.html',
    'lib/client/templates/posts/sb_post_submit.js',
    'lib/client/templates/posts/sb_post_title.html',
    'lib/client/templates/posts/sb_post_info.html',
    'lib/client/templates/posts/sb_post_vote.html',
    'lib/client/templates/posts/sb_post_content.html',
    'lib/client/templates/posts/post_tweet.html',
    'lib/client/templates/posts/post_tweet.js',

    //froala wysiwyg
    'lib/client/froala/froala_form.html',
    'lib/client/froala/froala_form.js',
    'lib/client/froala/froala_editor.min.css',
    'lib/client/froala/froala_editor.min.js',
    ////froala plugins
    'lib/client/froala/plugins/lists.min.js',
    'lib/client/froala/plugins/char_counter.min.js',
    'lib/client/froala/plugins/url.min.js',
    'lib/client/froala/plugins/font_size.min.js',
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
