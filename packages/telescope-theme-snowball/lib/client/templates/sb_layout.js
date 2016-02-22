Template.layout.onRendered(function () {
//fix for logout alert shown at startup
//  _.delay(Messages.clearSeen(), 500);
});

Template.layout.helpers({
  notLoggedOutCordova: function(){
      //if on cordova
    if(Meteor.isCordova){
      //if not logged in, don't show content
      if(!Meteor.userId()){
        return false;
      //if logged in, do show content
      } else {
        return true;
      }
    } else {
      return true;
    }
  },
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
