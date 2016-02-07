//make categories editable by members
Meteor.startup(function () {
  Categories.allow({
    insert: function(){return this.userId();},
    update: Users.is.ownerById,
    remove: Users.is.ownerById
  });
});
