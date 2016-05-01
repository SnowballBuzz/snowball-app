Template.postsLoadMore.onCreated(function(){

});

Template.postsLoadMore.onRendered(function(){

});

Template.postsLoadMore.helpers({
    isChannel: function(){
      return !!FlowRouter.getParam('groupId');
    }
});

Template.postsLoadMore.events({

});
