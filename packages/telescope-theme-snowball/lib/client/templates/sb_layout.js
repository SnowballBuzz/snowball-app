Template.layout.onRendered(function () {
//fix for logout alert shown at startup
//  _.delay(Messages.clearSeen(), 500);
});

Template.layout.helpers({
  resetPushBadges: function () {
    if (Meteor.userId()) {
      //todo: redirect if the user enters from a push notification
      //if (Meteor.user().telescope.pushBadge != null && Meteor.user().telescope.pushBadge.length > 0) {
        //if (Meteor.isCordova) {
        //  FlowRouter.go('/notifications');
        //}
        Meteor.call('resetBadge', Meteor.userId());
      //}
    }
  }
});

Template.layout.events({});
