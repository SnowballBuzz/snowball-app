Template.newPost.onCreated(function(){

});

Template.newPost.onRendered(function(){

});

Template.newPost.helpers({

});

Template.newPost.events({
  'click .newPost': function(e){
    e.preventDefault();
    Modal.show('post_submit_modal');
  }
});
