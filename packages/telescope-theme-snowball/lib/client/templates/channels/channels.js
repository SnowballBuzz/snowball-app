var IsSubscribedTo = function (channelId) {
  if ((Meteor.user().subscribedChannelsIds != null) === false) {
    return false;
  } else {
    return $.inArray(channelId, Meteor.user().subscribedChannelsIds) !== -1;
  }
};

Template.channels.onCreated(function () {
  Telescope.modules.add("titleArea", {
    template: "title",
    order: 10
  });
  Session.setDefault('searchQuery', '');
});

Template.channels.helpers({
  ChannelsToDisplay: function () {
    return Categories.find().fetch();
  },
  IsSubscribedTo: IsSubscribedTo,
  GetClassForIsSubscribedTo: function (channelId) {
    if (IsSubscribedTo(channelId)) {
      return "subscribed";
    } else {
      return "not-subscribed";
    }
  },
  channels: function () {
    //todo: will need to limit this eventually
    return ChannelsIndex.search(Session.get('searchQuery'), {}).fetch().sort(function(a,b){
      if(IsSubscribedTo(a._id) && IsSubscribedTo(b._id)){
        return 0;
      } else if(!IsSubscribedTo(a._id) && IsSubscribedTo(b._id)){
        return 1;
      } else if(IsSubscribedTo(a._id) && !IsSubscribedTo(b._id)){
        return -1;
      }
    });
  }
});

Template.channels.events({
  'click .not-subscribed button': function (e) {
    var channelId;
    channelId = $(e.target).attr("channel-id");
    if (IsSubscribedTo(channelId) === false) {
      return Meteor.call("subscribeToChannel", channelId);
    }
  },
  'click .subscribed button': function (e) {
    var channelId;
    channelId = $(e.target).attr("channel-id");
    if (IsSubscribedTo(channelId) === true) {
      return Meteor.call("unsubscribeToChannel", channelId);
    }
  },
  'click .showChannelSearch': function () {
    $('.channels-header').slideToggle(200);
    $('#search').focus();
  },
  'keyup #search_channels': _.debounce(function (e, t) {
    Session.set('searchQuery', e.target.value);
  }, 200)
});
