FlowRouter.route('/channels', {
  name: 'Channels',
  action: function (params) {
    return BlazeLayout.render("layout", {
      main: "channels"
    });
  }
});
FlowRouter.route('/channels/add', {
  name: 'AddChannels',
  action: function (params) {
    return BlazeLayout.render("layout", {
      main: "categories_admin"
    });
  }
});


FlowRouter.route('/notifications', {
  name: 'Notifications',
  action: function(params, queryParams) {
    return BlazeLayout.render("layout", {
      main: 'notifications'
    });
  }
});
