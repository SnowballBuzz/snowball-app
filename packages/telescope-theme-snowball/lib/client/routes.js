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
  action: function (params, queryParams) {
    return BlazeLayout.render("layout", {
      main: 'notifications'
    });
  }
});

//AccountsTemplates.configure({
//  defaultTemplate: 'login_form',
//});

delete AccountsTemplates.routes.signIn;
delete AccountsTemplates.routes.signUp;
delete AccountsTemplates.routes.changePwd;
delete AccountsTemplates.routes.forgotPwd;
delete AccountsTemplates.routes.resetPwd;
delete AccountsTemplates.routes.enrollAccount;
delete AccountsTemplates.routes.verifyEmail;
AccountsTemplates.configureRoute('signIn', {
    layoutType: 'blaze',
    name: 'signIn',
    path: '/sign-in',
    template: 'login_form',
    layoutTemplate: 'layout',
    contentRegion: 'main'
  }
);
AccountsTemplates.configureRoute('signUp', {
  name: 'signUp',
  path: '/register',
});
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('verifyEmail');
