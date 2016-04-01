Template.searchPosts.onCreated(function(){

});

Template.searchPosts.onRendered(function(){

});

Template.searchPosts.helpers({

});

Template.searchPosts.events({
  'click .showPostsSearch': function(e){
    e.preventDefault();
    $('.search.postsListTop-module').slideToggle();
    $('.search.postsListTop-module').children('.closeSearch').removeClass('hidden');
  }
});
