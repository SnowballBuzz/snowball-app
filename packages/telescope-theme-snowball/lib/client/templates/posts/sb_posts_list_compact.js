Template.posts_list_compact.onCreated(function(){

});

Template.posts_list_compact.onRendered(function(){

});

Template.posts_list_compact.helpers({
  date: function(post){
    return moment(post.postedAt).fromNow();
  }
});

Template.posts_list_compact.events({

});
