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
      return '<i class="icon icon-chevron-left"></i>';
    }
  }
});

Template.goBack.events({
  'click .goBack': function () {
    goBack();
  }
});


// requires Suspend plugin (org.android.tools.suspend)
// see: https://github.com/Lamerchun/org.android.tools.suspend
Meteor.startup(function () {
  if (Meteor.isCordova)
    document.addEventListener("backbutton", function () {
      if (Session.get('pathHistory')) {
        goBack();
      } else {
        window.plugins.Suspend.suspendApp();
      }
    });
});
