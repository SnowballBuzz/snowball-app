var invitedUser = function (user) {
  var invite = Invites.findOne({invitedUserEmail: user.telescope.email});
  if (invite) {
    Invites.update({invitedUserEmail: user.telescope.email}, {$set: {accepted: true}});
    console.log(user, invite);
    user.subscribedChannelsIds = [invite.groupId];
  }
  console.log(user);
  return user;
};
Telescope.callbacks.add("onCreateUser", invitedUser);
