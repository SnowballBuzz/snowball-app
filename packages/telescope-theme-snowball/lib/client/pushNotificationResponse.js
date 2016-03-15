Meteor.startup(function () {
  Push.addListener('startup', function (notification) {
    if (Meteor.userId()) {
      Meteor.call('resetBadge', Meteor.userId());
    }
    console.log(notification);
    //todo: why doesn't this work?
    FlowRouter.go('/posts/' + notification.payload.post._id);
  });
});
