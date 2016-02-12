AutoForm.hooks({
  insertCategoryForm: {
    onSuccess: function(formType, result){
      //console.log(formType, result);
      Meteor.call('subscribeToChannel', result, Meteor.user());
    }
  }
});
