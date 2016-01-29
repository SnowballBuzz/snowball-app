var IsSubscribedTo;

IsSubscribedTo = function(channelId) {
  if ((Meteor.user().subscribedChannelsIds != null) === false) {
    return false;
  } else {
    return $.inArray(channelId, Meteor.user().subscribedChannelsIds) !== -1;
  }
};

Template.channels.onCreated(function(){
  Telescope.modules.add("titleArea", {
    template: "title",
    order: 10
  });
});

Template.channels.helpers({
  ChannelsToDisplay: function() {
    return Categories.find().fetch();
  },
  IsSubscribedTo: IsSubscribedTo,
  GetClassForIsSubscribedTo: function(channelId) {
    if (IsSubscribedTo(channelId)) {
      return "subscribed";
    } else {
      return "not-subscribed";
    }
  }
});

Template.channels.events({
  'click .not-subscribed button': function(e) {
    var channelId;
    channelId = $(e.target).attr("channel-id");
    if (IsSubscribedTo(channelId) === false) {
      return Meteor.call("subscribeToChannel", channelId);
    }
  },
  'click .subscribed button': function(e) {
    var channelId;
    channelId = $(e.target).attr("channel-id");
    if (IsSubscribedTo(channelId) === true) {
      return Meteor.call("unsubscribeToChannel", channelId);
    }
  },
  'click .showChannelSearch': function(){
    $('.search.contentTop-module').slideToggle(200);
  }
});
