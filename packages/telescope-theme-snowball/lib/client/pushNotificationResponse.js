Push.addListener('startup', function(notification) {
  if (Meteor.userId()) {
    //todo: redirect if the user enters from a push notification
    //if (Meteor.user().telescope.pushBadge != null && Meteor.user().telescope.pushBadge.length > 0) {
    //if (Meteor.isCordova) {
    //  FlowRouter.go('/notifications');
    //}
    Meteor.call('resetBadge', Meteor.userId());
    //}
  }
  FlowRouter.go('/posts/' + notification.payload.post._id);
});
