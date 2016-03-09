Template.posts_list_compact.onCreated(function () {

});

Template.posts_list_compact.onRendered(function () {

});

Template.posts_list_compact.helpers({
  date: function (post) {
    return moment(post.postedAt).fromNow();
  },
  totalVotes: function () {
    var post = this;
    var totalVotes = post.upvotes + post.downvotes;
    return totalVotes === 1 ? totalVotes + ' vote' : totalVotes + ' votes';
  }
});

Template.posts_list_compact.events({});
