//make categories editable by members
Meteor.startup(function () {
  Categories.allow({
    //todo: only allow authenticated users?
    insert: function(){return true;},
    update: Users.is.ownerById,
    remove: Users.is.ownerById
  });
});
