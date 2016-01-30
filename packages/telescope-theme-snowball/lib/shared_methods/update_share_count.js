Meteor.methods({
  updateShareCount: function (id, count = 1) {
    //for some reason validation causes problems
    Posts.update(id, {$inc: {shares: count}});
  },
});
