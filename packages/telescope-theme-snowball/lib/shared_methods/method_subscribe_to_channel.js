Meteor.methods({
  "subscribeToChannel": function (channelId) {
    var newSubscribedChannelsIds;
    newSubscribedChannelsIds = Meteor.user().subscribedChannelsIds;
    if ((newSubscribedChannelsIds != null) === false) {
      newSubscribedChannelsIds = [channelId];
    } else {
      if (_.contains(newSubscribedChannelsIds, channelId) === true) {
        return "User already subscribed to this channel !";
      }
      newSubscribedChannelsIds.push(channelId);
    }
    return Users.update(Meteor.userId(), {
      $set: {
        subscribedChannelsIds: newSubscribedChannelsIds
      }
    });
  },
  "unsubscribeToChannel": function (channelId) {
    var index, newSubscribedChannelsIds;
    newSubscribedChannelsIds = Meteor.user().subscribedChannelsIds;
    if ((newSubscribedChannelsIds != null) === false || _.contains(newSubscribedChannelsIds, channelId) === false) {
      return "User was not subscribed";
    } else {
      index = newSubscribedChannelsIds.indexOf(channelId);
      newSubscribedChannelsIds.splice(index, 1);
    }
    return Users.update(Meteor.userId(), {
      $set: {
        subscribedChannelsIds: newSubscribedChannelsIds
      }
    });
  }
});
