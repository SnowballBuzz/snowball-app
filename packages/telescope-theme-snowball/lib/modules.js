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
//title area for Session.set('customTitle', 'example'), controlled in logo.js
Telescope.modules.add("titleArea", {template: "title", order: 10});
//left nav
Telescope.modules.add("primaryNav", [
  {template: 'navToChannels', order: 2},
  {template: 'nav_to_feed', order: 1}
]);
//right nav
//maybe I'll just keep the appearing search menu
Telescope.modules.add('secondaryNav', [
  {template: 'notifications_menu', order: 10},
  {template: 'search', order: 15},
  {template: 'submit_button', order: 30},
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

Telescope.modules.add('profileEdit', {template: 'goBack', order: 1});
