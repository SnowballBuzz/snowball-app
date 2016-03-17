Users.after.insert(function (userId, user) {
  if (user.emails) {
    Accounts.sendVerificationEmail(user);
  }
});
