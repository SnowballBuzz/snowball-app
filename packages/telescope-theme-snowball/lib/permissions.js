//make categories editable by members
Meteor.startup(function () {
  Categories.allow({
    insert: function(){return Meteor.user();},
    update: Users.is.ownerById,
    remove: Users.is.ownerById
  });
});
