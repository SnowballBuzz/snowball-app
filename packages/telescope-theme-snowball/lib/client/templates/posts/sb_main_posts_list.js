Template.main_posts_list.onCreated(function(){

});

Template.main_posts_list.onRendered(function(){

});

Template.main_posts_list.helpers({
  categoryPage: function(){
    var category;
    if(FlowRouter.getQueryParam('cat')){
      category = Categories.findOne({slug: FlowRouter.getQueryParam('cat')[0]});
    }else if(FlowRouter.getParam('groupId')){
      category = Categories.findOne(FlowRouter.getParam('groupId'));
    }else{
      category = false;
    }
    return category && !_.contains(Meteor.user().subscribedChannelsIds, category._id);
  },
  specialCategoryPageClass: function(){
    var groupId = FlowRouter.getParam('groupId');
    if(groupId){
        return "category-page";
      if(Categories.findOne(groupId).disableShare){
        return "category-page share-disabled";
      }
    }
  }
});

Template.main_posts_list.events({
  'click .showPostsSearch': function(e){
    e.preventDefault();
    $('.search.postsListTop-module').slideToggle(300)
      .find('.closeSearch').toggleClass('hidden');
  },
  'click .js-join-group': function(e){
    var groupId = FlowRouter.getParam('groupId');
    Meteor.call('joinGroup', groupId, Meteor.userId());
  }
});
