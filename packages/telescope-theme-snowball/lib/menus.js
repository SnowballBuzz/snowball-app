Telescope.modules.removeAll("primaryNav");

Telescope.modules.add("primaryNav", [
  {
    template: 'navToChannels',
    order: 1
  }, {
    template: 'search',
    order: 2
  }
]);
