Template.channels.onCreated(function () {
  Telescope.modules.add("titleArea", {
    template: "title",
    order: 10
  });
  Session.setDefault('searchQuery', '');
});

Template.channels.onRendered(function () {
  //$('.channel-list-item').hammer().on('swipe', function(e){
  //  console.log('swiped!', e);
  //});
});

Template.channels.helpers({
  touchEvents: {
    'swipeleft .channel-list-item': function (event, templateInstance) {
      console.log(event, templateInstance);
    },
    'drag .channel-list-item': function(event, templateInstance) {
      console.log(event, templateInstance);
    }
  },
  categoryLink: function(){
    return Categories.getUrl(this);
  },
  ChannelsToDisplay: function () {
    return Categories.find().fetch();
  },
  IsSubscribedTo: function(groupId){
    return Users.hasJoinedGroup(groupId);
  },
  GetClassForIsSubscribedTo: function (channelId) {
    if (Users.hasJoinedGroup(channelId)) {
      return "subscribed";
    } else {
      return "not-subscribed";
    }
  },
  channels: function () {
    //todo: will need to limit this eventually
    return ChannelsIndex.search(Session.get('searchQuery'), {}).fetch().sort(function (a, b) {
      if (Users.hasJoinedGroup(a._id) && Users.hasJoinedGroup(b._id)) {
        return 0;
      } else if (!Users.hasJoinedGroup(a._id) && Users.hasJoinedGroup(b._id)) {
        return 1;
      } else if (Users.hasJoinedGroup(a._id) && !Users.hasJoinedGroup(b._id)) {
        return -1;
      }
    });
  }
});

Template.channels.events({
  'click button.subscribe-button': function (e) {
    var channelId = $(e.target).attr("channel-id");
    Meteor.call('joinGroup', channelId, Meteor.userId());
  },
  'click .showChannelSearch': function () {
    $('.channels-header').slideToggle(200);
    $('#search_channels').focus();
  },
  'keyup #search_channels': _.debounce(function (e, t) {
    Session.set('searchQuery', e.target.value);
  }, 200)
});
