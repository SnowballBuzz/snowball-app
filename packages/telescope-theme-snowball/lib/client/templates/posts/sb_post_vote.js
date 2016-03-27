Template.post_vote.helpers({
  //enableDownvotes: function () {
  //  return Settings.get("enableDownvotes", false);
  //}, actionsClass: function () {
  //  var user = Meteor.user();
  //  var actionsClass = "";
  //  if (!user) return false;
  //  if (user.hasUpvoted(this)) {
  //    actionsClass += " voted upvoted";
  //  }
  //  if (user.hasDownvoted(this)) {
  //    actionsClass += " voted downvoted";
  //  }
  //  if (Settings.get("enableDownvotes", false)) {
  //    actionsClass += " downvotes-enabled";
  //  }
  //  return actionsClass;
  //}
  hasVoted: function () {
    return Users.hasUpvoted(Meteor.user(), this) || Users.hasDownvoted(Meteor.user(), this);
  },
  upvotePercent: function () {
    var totalVotes = this.upvotes + this.downvotes;
    var percentUpvote = 100 * (this.upvotes / totalVotes);
    return percentUpvote.toFixed(0) + '%';
  },
  downvotePercent: function () {
    var totalVotes = this.upvotes + this.downvotes;
    var percentDownvote = 100 * (this.downvotes / totalVotes);
    return percentDownvote.toFixed(0) + '%';
  }
});
Template.post_vote.events({
  'click .upvote': function (e) {
    var post = this;
    var user = Meteor.user();
    e.preventDefault();
    if (!user) {
      FlowRouter.go('signIn');
      Messages.flash(i18n.t("please_log_in_first"), "info");
    } else if (!user.hasUpvoted(post) && !user.hasDownvoted(post)) {
      if (Users.hasJoinedGroup(post.categories[0], Meteor.userId())) {
        Meteor.call('upvotePost', post._id, function () {
          Events.track("post upvoted", {'_id': post._id});
        });
      } else {
        var join = confirm('Join the group to upvote this post');
        if (join) {
          Meteor.call('joinGroup', post.categories[0], Meteor.userId(), function (err, res) {
            console.log(err, res);
            if (res) {
              Meteor.call('upvotePost', post._id, function () {
                Events.track("post upvoted", {'_id': post._id});
              });
            }
          });
        }
      }
    }
  },
  'click .downvote': function (e) {
    var post = this;
    var user = Meteor.user();
    e.preventDefault();
    if (!user) {
      FlowRouter.go('atSignIn');
      Messages.flash(i18n.t("please_log_in_first"), "info");
    }
    if (!user.hasUpvoted(post) && !user.hasDownvoted(post)) {
      // Meteor.call('cancelDownvotePost', post._id, function () {
      //   Events.track("post downvote cancelled", {'_id': post._id});
      // });
      if (Users.hasJoinedGroup(post.categories[0], Meteor.userId())) {
        Meteor.call('downvotePost', post._id, function () {
          Events.track("post downvoted", {'_id': post._id});
        });
      } else {
        var join = confirm('Join the group to downvote this post');
        if (join) {
          Meteor.call('joinGroup', post.categories[0], Meteor.userId(), function (err, res) {
            if (res) {
              console.log(res)
              Meteor.call('downvotePost', post._id, function () {
                Events.track("post downvoted", {'_id': post._id});
              });
            }
          });
        }
      }
    }
  }
}); 
