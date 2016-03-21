var invitedUser = function (user) {
  var invite = Invites.findOne({invitedUserEmail: user.telescope.email});
  if (invite) {
    Invites.update({invitedUserEmail: user.telescope.email}, {$set: {accepted: true}});
    console.log(user, invite);
    user.subscribedChannelsIds = [invite.groupId];
    // user.emails[0].verified = true;
  }
  // console.log(user);
  //todo: use more serious security here
  if(Session.get('verifyEmail')){
    user.emails[0].verified = true;
  }
  return user;
};
Telescope.callbacks.add("onCreateUser", invitedUser);
