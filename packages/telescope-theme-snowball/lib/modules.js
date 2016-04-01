//reset
Telescope.modules.removeAll("primaryNav");
Telescope.modules.removeAll("secondaryNav");
Telescope.modules.removeAll("postHeading");
Telescope.modules.removeAll("postMeta");
Telescope.modules.removeAll("mobileNav");
//Telescope.modules.removeAll('postComponents');


//remove
Telescope.modules.remove('postsListTop', 'views_menu');
Telescope.modules.remove('postComponents', 'post_vote');
Telescope.modules.remove('postComponents', 'post_share');
Telescope.modules.remove('postComponents', 'post_avatars');
Telescope.modules.remove('postComponents', 'post_discuss');
Telescope.modules.remove('postComponents', 'post_actions');
Telescope.modules.remove('profileEdit','afArrayField_bootstrap3-horizontal');
//Telescope.modules.remove('profileDisplay', 'user_posts');

//add

//header
Telescope.modules.add('logoArea', {template: 'logo', order: 1,
  except: ['Channel', 'signIn', 'signUp']
});
Telescope.modules.add('logoArea', {template: 'channel_title', order: 1, only: ['Channel']});
Telescope.modules.add('logoArea', {template: 'signin_title', order: 1, only: ['signIn']});
Telescope.modules.add('logoArea', {template: 'signup_title', order: 1, only: ['signUp']});

//left mobile icon
Telescope.modules.add('leftMobileNav', {template: 'user_points', order: 1,
  except: ['postPage', 'EditChannels', 'Channels', 'AddChannels', 'userProfile', 'commentPage', 'commentEdit']
});
//Back button
Telescope.modules.add('leftMobileNav', {template: 'goBack', order: 1, only: ['postPage', 'userProfile', 'commentPage', 'EditChannels', 'AddChannels', 'profileEdit']});
// do we need a cancel button here? Telescope.modules.add('leftMobileNav', {template: '', order: 1, only: ['AddChannels']});
Telescope.modules.add('leftMobileNav', {template: 'add_channel', order: 1, only: ['Channels']});
//'add' button

//right nav
Telescope.modules.add('rightMobileNav', {template: 'newPost', order: 2, except: ['EditChannels', 'AddChannels', 'commentEdit', 'signIn', 'signUp']});
Telescope.modules.add('rightMobileNav', {template: 'searchPosts', order: 1, except: ['EditChannels', 'AddChannels', 'commentEdit']});

//left desktop nav
Telescope.modules.add("primaryNav", [
  {template: 'navToChannels', order: 2},
  {template: 'nav_to_feed', order: 1}
]);
Telescope.modules.add('primaryNav', {template: 'add_channel', order: 3, only: ['Channels']});
//right nav
//maybe I'll just keep the appearing search menu
Telescope.modules.add('secondaryNav', [
  {template: 'notifications_menu', order: 10},
  {template: 'search', order: 15},
  {template: 'newPost', order: 30, except: [ 'signIn', 'signUp']},
  {template: 'user_menu', order: 20}
]);
Telescope.modules.add('postsListTop', [
  {template: 'search', order: 1, class: 'hidden', id: 'search2'},
  {template: 'post_submit_quick', order: 10}
]);
Telescope.modules.add("postsListTop", {
  template: 'category_title',
  order: 1,
  only: ["Channel"]
});

//hidden
//Telescope.modules.add('contentTop', {template: 'search', order: 20});
//move post category before title
Telescope.modules.add('postHeading', [
  {template: 'post_categories', order: 1},
  {template: 'post_info', order: 2},
  {template: 'post_title', order: 3}
]);
Telescope.modules.add('postMeta', [
  //{template: 'post_body', order: 3},
  {template: 'post_rationale', order: 4},
  {template: 'post_vote', order: 5},
  {template: 'post_tweet', order: 10},
  //{template: 'post_admin', order: 15}
]);
Telescope.modules.add('postComponents', [
  {template: 'post_link_overlay', order: 1},
]);
//add mobile menu
Telescope.modules.add('footer', {template: 'mobile_menu', order: 1});

//back button for user profile edit
Telescope.modules.add('profileDisplay', {template: 'log_out', order: 6});
