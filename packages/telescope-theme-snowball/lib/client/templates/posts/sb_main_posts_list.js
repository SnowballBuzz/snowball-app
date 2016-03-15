Template.main_posts_list.onCreated(function(){

});

Template.main_posts_list.onRendered(function(){

});

Template.main_posts_list.helpers({
  categoryPage: function(){
    return FlowRouter.getQueryParam('cat');
  }
});

Template.main_posts_list.events({
  'click .showPostsSearch': function(e){
    e.preventDefault();
    $('.search.postsListTop-module').slideToggle(300)
      .find('.closeSearch').toggleClass('hidden');
  }
});
