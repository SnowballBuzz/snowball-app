//remove
Telescope.modules.remove('postsListTop', 'views_menu');
Telescope.modules.remove('primaryNav', 'search');

//add
Telescope.modules.add('footer', {
  template: 'mobile_menu',
  order: 1
});
Telescope.modules.add("titleArea", {template: "title", order: 10});
Telescope.modules.add('secondaryNav', {template: 'search', order: 20});
Telescope.modules.add('contentTop', {template: 'search', order: 20});
