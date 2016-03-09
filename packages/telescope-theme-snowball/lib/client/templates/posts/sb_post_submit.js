Template.post_submit.onRendered(function () {
});

Template.post_submit.helpers({
  isSubscribed: function () {
    if (Meteor.user().subscribedChannelsIds != null && Meteor.user().subscribedChannelsIds.length) {
      return true;
    }
  }
});

Template.post_submit.events({
  'click .submitPost': function () {
    $('#submitPostForm').submit();
  }
});
