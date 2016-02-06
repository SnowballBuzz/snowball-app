Template.registerHelper('isUser', function (userA, userB) {
// if there is no default argument, defaultArgument will be a Spacebars.kw object; so set it to undefined
// see http://stackoverflow.com/questions/27755891/meteor-what-is-spacebars-kw-hash-object
  return userA._id === userB._id;
});
