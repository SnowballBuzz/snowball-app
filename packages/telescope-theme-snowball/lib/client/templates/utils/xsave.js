Template.goBack.onCreated(function () {

});

Template.goBack.onRendered(function () {

});

Template.goBack.helpers({
  text: function () {
    //console.log(this);
    if (!!this.text) {
      return this.text;
    } else {
      return '<i class="fa fa-save"></i>';
    }
  }
});

Template.goBack.events({
  'click .submitForm': function () {
    submitForm();
  }
});
