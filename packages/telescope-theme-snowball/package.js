Package.describe({
  summary: "Telescope snowball theme",
  version: '0.0.8',
  name: "telescope-theme-snowball"
});

Package.onUse(function (api) {

  api.use([
    'fourseven:scss@3.4.1',
    'templating@1.1.1',
    'kadira:flow-router@2.7.0',
    'arillo:flow-router-helpers@0.4.5',
    'random@1.0.3',
    'less',
    'peppelg:bootstrap-3-modal@1.0.4',
    '255kb:cordova-keyboard@1.2.0',
    'raix:iscroll@0.0.3',
    'gwendall:body-events@0.1.6',
    'harrison:papa-parse@1.1.1',
    'summernote:summernote@0.8.1'
  //'moonco:hammer'
  ], ['client']);
  api.use([
    'telescope:core@0.25.6',
    'telescope:notifications@0.25.6',
    'telescope:tags@0.25.6',
    'telescope:users@0.25.6',
    'telescope:search@0.25.6',
    'telescope:email@0.25.6',
    'matb33:collection-hooks@0.8.1',
    'aldeed:simple-schema@1.3.3',
    'aldeed:autoform@5.1.2',
    //'comerc:autoform-selectize',
    //'jeremy:selectize',
    'aldeed:autoform-select2@2.0.2',
    'loftsteinn:autoform-tags@0.2.0',
    'daviator:select2@0.0.1',
    'easy:search@2.0.8',
    'raix:push@3.0.2',
    'kestanous:herald@1.3.0',
    'chriswessels:hammer@4.0.2',
    'telescope:messages@0.25.6',
    'babrahams:editable-list@0.4.10',
    'dburles:mongo-collection-instances@0.3.5',
    'telescope:invites@0.25.6'
  ], ['client', 'server']);
  api.use([
    //'promise'
  ], ['server']);

  api.addAssets([
    'fonts/Montserrat-Bold.ttf',
    'fonts/OpenSans-Regular.ttf',
    'fonts/OpenSans-Light.ttf',
    'fonts/OpenSans-Semibold.ttf',
    'fonts/icomoon.ttf',
    'fonts/icomoon.svg',
    'fonts/icomoon.eot',
    'fonts/icomoon.woff',
    'images/Snowball200.png',
  //  'lib/Snowball200.png',
  ], ['client']);

  //functions & methods
  api.addFiles([
    'lib/shared_methods/method_subscribe_to_channel.js',
    'lib/shared_methods/update_share_count.js',
    'lib/shared_methods/channelHooks.js',
    'lib/shared_methods/canSubscribe.js',
    'lib/shared_methods/joinGroup.js',
    'lib/shared_methods/notificationTest.js',
    'lib/channels.js',
    'lib/snowball_config.js',
    'lib/modules.js',
    'lib/client/routes.js',
    'lib/fields.js',
    'lib/server/permissions.js',
    'lib/channelsSearchIndex.js',
    'lib/shared_methods/xPostsCourier.js',
    // 'lib/invitesCollection.js'
    'lib/shared_methods/userHooks.js'
  ], ['client', 'server']);
  api.addFiles([
    'lib/server/pushCourier.js',
    'lib/server/pushMethods.js',
    'lib/server/addAndVerifyEmail.js',
    'lib/server/verifyUnverifiedAccounts.js',
    'lib/server/subscribePrivateOnVerify.js',
    'lib/server/spiderableIgnoreSSLErrors.js',
    'lib/server/notificationEvents.js',
    'lib/server/accountsConfig.js',
    'lib/server/sendInviteEmails.js',
  ], ['server']);

  api.addFiles([

    //fix
    'lib/client/externalLinkFix.js',

    //config
    'lib/client/mobile.js',

    //styles
    'lib/client/stylesheets/snowball.scss',
    'lib/client/colors.js',

    //linear icons set
    'lib/client/icons-set-style.css',
    'lib/client/icons.js',

    //bootstrap
    'lib/client/bootstrap/modal.js',
    'lib/client/bootstrap/modals.less',
    'lib/client/bootstrap/variables.less',
    'lib/client/bootstrap/vendor-prefixes.less',
    'lib/client/bootstrap/opacity.less',
    'lib/client/bootstrap/buttons.less',
    'lib/client/bootstrap/buttons-mixins.less',
    'lib/client/bootstrap/tab-focus.less',
    'lib/client/bootstrap/forms-mixins.less',
    'lib/client/bootstrap/forms.less',
    'lib/client/bootstrap/grid-mixins.less',

    //methods
    'lib/client/methods/methods.js',

    //copy override
    'i18n/en.i18n.json',
    'lib/client/momentOverride.js',

    //utility
    'lib/client/templates/templateHelpers.js',
    'lib/client/templates/utils/goBack.html',
    'lib/client/templates/utils/goBack.js',
    'lib/client/templates/utils/signin_title.html',
    'lib/client/templates/utils/signup_title.html',
    'lib/client/templates/utils/user_points.html',
    'lib/client/templates/utils/add_channel.html',
    'lib/client/templates/utils/newPost.html',
    'lib/client/templates/utils/newPost.js',
    'lib/client/templates/utils/searchPosts.html',
    'lib/client/templates/utils/searchPosts.js',

    //template
    ////search
    'lib/client/templates/sb_search.html',
    'lib/client/templates/sb_search.js',
    ////login
    'lib/client/templates/login_form.html',
    ////layout
    'lib/client/templates/sb_layout.html',
    'lib/client/templates/sb_layout.js',
    'lib/client/templates/sb_header.html',
    ////mobile menu
    'lib/client/templates/mobile_menu.html',
    'lib/client/templates/mobile_menu.js',
    ////channels
    'lib/client/templates/channels/channel_title.html',
    'lib/client/templates/channels/channel_title.js',
    'lib/client/templates/channels/channels.html',
    'lib/client/templates/channels/channels.js',
    'lib/client/templates/channels/sb_post_categories.html',
    'lib/client/templates/channels/share_group.html',
    'lib/client/templates/channels/share_group.js',
    'lib/client/templates/channels/sb_category_title.html',
    'lib/client/templates/channels/sb_category_title.js',
    'lib/client/templates/channels/sb_categories_admin.html',
    'lib/client/templates/channels/sb_categories_admin.js',
    'lib/client/templates/channels/private_channel_modal.html',
    'lib/client/templates/channels/private_channel_modal.js',
    'lib/client/templates/channels/subscribeOnCreate.js',
    ////main navbar
    'lib/client/templates/main_navbar/nav_to_channels.html',
    'lib/client/templates/main_navbar/nav_to_feed.html',
    ////notifications
    'lib/client/templates/notifications/notifications.html',
    'lib/client/templates/notifications/notifications.js',
    'lib/client/templates/notifications/sb_notifications_menu.html',
    'lib/client/templates/notifications/sb_notifications_menu.js',
    ////logo template with title override
    'lib/client/templates/sb_logo.html',
    'lib/client/templates/sb_logo.js',
    //post stuff
    'lib/client/templates/posts/sb_post_submit.html',
    'lib/client/templates/posts/sb_post_submit.js',
    'lib/client/templates/posts/post_submit_quick.html',
    'lib/client/templates/posts/post_submit_quick.js',
    'lib/client/templates/posts/sb_post_title.html',
    'lib/client/templates/posts/sb_post_info.html',
    'lib/client/templates/posts/sb_post_vote.html',
    'lib/client/templates/posts/sb_post_vote.js',
    'lib/client/templates/posts/sb_post_content.html',
    'lib/client/templates/posts/post_tweet.html',
    'lib/client/templates/posts/post_tweet.js',
    'lib/client/templates/posts/sb_submit_button.html',
    'lib/client/templates/posts/sb_submit_button.js',
    'lib/client/templates/posts/sb_post_template.html',
    'lib/client/templates/posts/post_link_overlay.html',
    'lib/client/templates/posts/sb_postsLoadMore.html',
    'lib/client/templates/posts/sb_posts_list_compact.html',
    'lib/client/templates/posts/sb_posts_list_compact.js',
    'lib/client/templates/posts/sb_main_posts_list.html',
    'lib/client/templates/posts/sb_main_posts_list.js',
    'lib/client/templates/posts/post_rationale.html',
    'lib/client/templates/posts/post_rationale.js',
    'lib/client/templates/posts/post_submit_modal.html',
    'lib/client/templates/posts/post_submit_modal.js',

    //user profile
    'lib/client/templates/user/sb_user_info.html',
    'lib/client/templates/user/sb_user_profile.html',
    'lib/client/templates/user/sb_user_profile.js',
    'lib/client/templates/user/sb_user_posts.html',
    'lib/client/templates/user/sb_user_posts.js',
    'lib/client/templates/utils/log_out.html',
    'lib/client/templates/sb_comments_list_compact.html',

    //textareaAdvanced
    'lib/client/autoform-textarea-advanced/afTextareaAdvanced.html',
    'lib/client/autoform-textarea-advanced/afTextareaAdvanced.js',
    'lib/client/autoform-textarea-advanced/afTextareaAdvanced.scss',
    'lib/client/autoform-textarea-advanced/jquery.textarea_autosize.js',

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
