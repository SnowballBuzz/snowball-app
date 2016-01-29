FlowRouter.route('/channels', {
  name: 'Channels',
  action: function (params) {
    return BlazeLayout.render("layout", {
      main: "channels"
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
