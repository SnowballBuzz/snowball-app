//group routes
FlowRouter.route('/groups', {
  name: 'Channels',
  action: function (params) {
    return BlazeLayout.render("layout", {
      main: "channels"
    });
  }
});
FlowRouter.route('/groups/add', {
  name: 'AddChannels',
  action: function (params) {
    return BlazeLayout.render("layout", {
      main: "categories_admin"
    });
  }
});
FlowRouter.route('/groups/:groupId', {
  name: 'Channel',
  action: function (params) {
    return BlazeLayout.render('layout', {
      main: 'main_posts_list'
    });
  }
});
FlowRouter.route('/groups/:groupId/edit', {
  name: 'EditChannels',
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

FlowRouter.route('/submit', {
  name: "postSubmit",
  action: function (params, queryParams) {
    //BlazeLayout.render("layout", {main: "post_submit"});
    console.log('rendered submit page');
  }
});

//overriding logout hook to remove message
//FlowRouter.route('/sign-out', {
//  name: "signOut",
//  triggersEnter: [function(context, redirect) {
//    AccountsTemplates.logout();
//Messages.flash(i18n.t("you_have_been_logged_out"));
//  }]
//});


AccountsTemplates.configure({
  homeRoutePath: '/',
  redirectTimeout: 1000,
  onLogoutHook: function () {
    //FlowRouter.go('/');
  },
});

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
AccountsTemplates.configureRoute('verifyEmail', {
  layoutType: 'blaze',
  name: 'verifyEmail',
  template: 'login_form',
  layoutTemplate: 'layout',
  contentRegion: 'main'
});
AccountsTemplates.knownRoutes.push('signOut');

// FlowRouter.triggers.enter([
//   function () {
//     // Meteor.setTimeout(function() {
//     BlazeLayout.render('layout', {
//       main: "channels",
//       // headerZoneRight: 'tester',
//       // headerZoneLeft: 'tester',
//     });
//     // }, 0);
//     // console.log('on channel page');
//   }
// ], {
//   only: ["Channels"]
// });

FlowRouter.triggers.enter([
  function(context){
    BlazeLayout.render("layout", {main: "main_posts_list"});
    if(!Meteor.userId()){
      console.log('not logged in, redirecting');
      FlowRouter.go('signIn');
    }
  }
], {
  only: ['postsDefault']
});

FlowRouter.triggers.enter([
  function (context) {
    if (context.queryParams.inviteId) {
      console.log(context.queryParams.inviteId);
      //todo: use more serious security here
      // Meteor.call('verifyEmail', context.queryParams.inviteId, Meteor.userId());
    }
  }
], {
  only: ["signUp"]
});
