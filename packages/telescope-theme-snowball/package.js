Package.describe({
  summary: "Telescope snowball theme",
  version: '0.0.1',
  name: "telescope-theme-snowball"
});

Package.onUse(function (api) {

  api.use([
    'fourseven:scss',
    'templating',
    'kadira:flow-router',
    'arillo:flow-router-helpers',
    'random'
  ], ['client']);
  api.use([
    'telescope:core',
    'telescope:notifications',
    'telescope:tags',
    'telescope:users',
    'aldeed:simple-schema',
    'aldeed:autoform',
    'comerc:autoform-selectize',
    'jeremy:selectize',
    'easy:search',
    'raix:push',
    'kestanous:herald',
    'matb33:collection-hooks'
  ], ['client', 'server']);

  api.addAssets([
    'fonts/Montserrat-Bold.ttf',
    'fonts/OpenSans-Light.ttf',
    'fonts/OpenSans-Semibold.ttf',
    'images/Snowball200.png',
  ], ['client']);

  //functions & methods
  api.addFiles([
    'lib/shared_methods/method_subscribe_to_channel.js',
    'lib/shared_methods/update_share_count.js',
    'lib/channels.js',
    'lib/snowball_config.js',
    'lib/modules.js',
    'lib/client/routes.js',
    'lib/fields.js',
    'lib/permissions.js',
    //'lib/config.push.json'
  ], ['client', 'server']);
  api.addFiles([
    'lib/server/pushCourier.js',
    'lib/server/pushMethods.js'
  ], ['server']);

  api.addFiles([
    //styles
    'lib/client/stylesheets/snowball.scss',
    'lib/client/colors.js',

    //methods
    'lib/client/methods/methods.js',

    //copy override
    'i18n/en.i18n.json',

    //utility
    'lib/client/templates/templateHelpers.js',

    //templates
    ////login
    'lib/client/templates/login_form.html',
    ////layout
    'lib/client/templates/sb_layout.html',
    'lib/client/templates/sb_header.html',
    ////mobile menu
    'lib/client/templates/mobile_menu.html',
    'lib/client/templates/mobile_menu.js',
    ////channels
    'lib/client/templates/channels/channels.html',
    'lib/client/templates/channels/channels.js',
    'lib/client/templates/channels/sb_categories_admin.html',
    'lib/client/templates/channels/sb_categories_admin.js',
    'lib/channelsSearchIndex.js',
    ////main navbar
    'lib/client/templates/main_navbar/nav_to_channels.html',
    'lib/client/templates/main_navbar/nav_to_feed.html',
    ////notifications
    'lib/client/templates/notifications.html',
    'lib/client/templates/notifications.js',
    'lib/client/templates/sb_notifications_menu.html',
    'lib/client/templates/sb_notifications_menu.js',
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
    'lib/client/templates/posts/sb_submit_button.html',
    'lib/client/templates/posts/sb_post_template.html',

    //back button
    'lib/client/templates/goBack.html',
    'lib/client/templates/goBack.js',

    //user profile
    'lib/client/templates/sb_user_profile.html',
    'lib/client/templates/sb_user_posts.html',
    'lib/client/templates/sb_user_posts.js',

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

    //select2 library
    'lib/client/select2.full.min.js',
    'lib/client/select2.min.css',
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
