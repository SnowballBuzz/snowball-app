Template.main_posts_list.onCreated(function(){

});

Template.main_posts_list.onRendered(function(){

});

Template.main_posts_list.helpers({
  categoryPage: function(){
    var categorySlug = FlowRouter.getQueryParam('cat');
    var category = Categories.findOne({slug: categorySlug[0]});
    return category && !_.contains(Meteor.user().subscribedChannelsIds, category._id);
  }
});

Template.main_posts_list.events({
  'click .showPostsSearch': function(e){
    e.preventDefault();
    $('.search.postsListTop-module').slideToggle(300)
      .find('.closeSearch').toggleClass('hidden');
  }
});
