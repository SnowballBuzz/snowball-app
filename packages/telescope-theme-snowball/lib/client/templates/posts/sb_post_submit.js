Template.post_submit.helpers({

});

Template.post_submit.events({
  'click .submitPost': function(){
    $('#submitPostForm').submit();
  },
  'click .cancelPost': function(){
    goBack();
  }
});
