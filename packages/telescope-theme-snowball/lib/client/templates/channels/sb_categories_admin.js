Template.categories_admin.onCreated(function(){

});

Template.categories_admin.onRendered(function(){

});

Template.categories_admin.helpers({

});

Template.categories_admin.events({
  'click .submitChannel': function(){
    console.log('clicked submit');
    $('#insertCategoryForm').submit();
    goBack();
  },
  'click .cancelChannel': function(){
    console.log('clicked cancel');
    goBack();
  },
  'submit #insertCategoryForm': function(e){
    console.log('submitting');
    e.preventDefault();
    $('#insertCategoryForm').submit();
    goBack();
  }
});
