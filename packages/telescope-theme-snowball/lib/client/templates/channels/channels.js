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
    return ChannelsIndex.search(Session.get('searchQuery'), {}).fetch().sort(function (a, b) {
      if (IsSubscribedTo(a._id) && IsSubscribedTo(b._id)) {
        return 0;
      } else if (!IsSubscribedTo(a._id) && IsSubscribedTo(b._id)) {
        return 1;
      } else if (IsSubscribedTo(a._id) && !IsSubscribedTo(b._id)) {
        return -1;
      }
    });
  }
});

Template.channels.events({
  'click button.subscribe-button': function (e) {
    var channelId = $(e.target).attr("channel-id");
    var channel = Categories.findOne(channelId);
    //If it's private and you're not the owner
    if (channel.isPrivate) {
      Meteor.call('canSubscribe', Meteor.user(), channel, function (err, res) {
        if (res) {
          //if it returns true, subscribe
          console.log('subscribed');
          //Messages.flash('Subscribed!', 'success');
          subscribeUnsubscribe(channelId);
        } else if (err) {
          //if you get an error
          throw err;
        } else {
          //if it returns false
          console.log('not allowed');
          //Messages.flash('Sorry, this is a private channel!', 'error');
          alert('Sorry, this is a private channel!');
        }
      });
      //if it's public or you own it
    } else {
      subscribeUnsubscribe(channelId);
    }
    var subscribeUnsubscribe = function (channelId) {
      if (IsSubscribedTo(channelId) === false) {
        return Meteor.call("subscribeToChannel", channelId);
      } else if (IsSubscribedTo(channelId) === true) {
        return Meteor.call("unsubscribeToChannel", channelId);
      }
    };
  },
  'click .showChannelSearch': function () {
    $('.channels-header').slideToggle(200);
    $('#search_channels').focus();
  },
  'keyup #search_channels': _.debounce(function (e, t) {
    Session.set('searchQuery', e.target.value);
  }, 200)
});
