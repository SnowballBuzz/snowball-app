Users.hasJoinedGroup = function (channelId, userId) {
  var user = Users.findOne(userId) || Meteor.user();
  if ((user.subscribedChannelsIds != null) === false) {
    return false;
  } else {
    return _.contains(user.subscribedChannelsIds, channelId);
  }
};
Meteor.methods({
  joinGroup: function (groupId, userId) {
    var user = Users.findOne(userId);
    var channel = Categories.findOne(groupId);
    // console.log(groupId, channel);

    //toggle subscribe
    var subscribeUnsubscribe = function (groupId) {
      if (Users.hasJoinedGroup(groupId, userId) === false) {
        return Meteor.call("subscribeToChannel", groupId, function () {

        });
      } else if (Users.hasJoinedGroup(groupId, userId) === true) {
        return Meteor.call("unsubscribeToChannel", groupId);
      }
    };

    //If it's private and you're not the owner, deny, otherwise subscribe
    if (channel.isPrivate) {
      Meteor.call('canSubscribe', user, channel, function (err, res) {
        //if it returns true, subscribe
        if (res) {
          console.log('subscribed');
          subscribeUnsubscribe(groupId);
          return channel;
          //if you get an error
        } else if (err) {
          throw err;
          //if it returns false
        } else {
          console.log(err, res);
          if (Meteor.isClient) {
            Modal.show('private_channel_modal', channel);
          }
        }
      });
      //if it's public or you own it subscribe
    } else {
      subscribeUnsubscribe(groupId);
      return channel;
    }
  }
});
