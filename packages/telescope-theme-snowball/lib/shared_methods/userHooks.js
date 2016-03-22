var invitedUser = function (user) {
  var invite = Invites.findOne({invitedUserEmail: user.telescope.email});
  if (invite) {
    Invites.update({invitedUserEmail: user.telescope.email}, {$set: {accepted: true}});
    //If the user is using the right link with the inviteId
    if(user.profile.inviteId === invite._id){
      user.emails[0].verified = true;
    }
    user.subscribedChannelsIds = [invite.groupId];
    //verification only gets sent if the email is not verified, as it is here (accountsConfig.js)
  }
  return user;
};

Telescope.callbacks.add("onCreateUser", invitedUser);
