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
// overriding logout hook to attempt to fix latency
FlowRouter.route('/sign-out', {
  name: "signOut",
  triggersEnter: [function(context, redirect) {
    AccountsTemplates.logout();
    Messages.flash(i18n.t("you_have_been_logged_out"));
  }]
});

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
  function (context) {
    if (context.queryParams.token && !Meteor.userId()) {
      console.log('logging in with token: ' + context.queryParams.token);
      LoginLinks.loginWithToken(context.queryParams.token, function(err){
        console.log(err,this);
      });
    }
  }
]);

FlowRouter.triggers.enter([
  function (context) {
    BlazeLayout.render("layout", {main: "main_posts_list"});
    if (!Meteor.userId()) {
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

if (Meteor.settings.public.groupId) {
  FlowRouter.triggers.enter([
    function (context) {
      console.log('rerouting from ' + context.route.name);
      if (context.params.groupId !== Meteor.settings.public.groupId) {
        FlowRouter.go('Channel', {groupId: Meteor.settings.public.groupId});
      }
    }
  ], {
    except: ["Channel", "postPage", "postEdit", "signIn", "signUp", "signOut", "changePwd",
      "forgotPwd", 'atForgotPwd', "resetPwd", "enrollAccount", "verifyEmail", "userProfile", "userEdit",
      "adminSettings", "adminUsers", "adminPages", "adminFeeds", "adminCategories", "commentEdit"]
  });
}
