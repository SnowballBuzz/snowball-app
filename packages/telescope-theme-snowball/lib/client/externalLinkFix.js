//Meteor.startup(function () {
//  //if(Meteor.isCordova){
//  console.log('No more clicks!');
//  $('a').on('click', function (e) {
//    e.preventDefault();
//    //e.preventBubble();
//    console.log('prevented');
//  });
//  //}
//});

//depends on gwendall:body-events@0.1.6
//depends cordova:org.apache.cordova.inappbrowser@1.3.0

Template.body.events({
  'click a': function (e, d, t) {
    if (Meteor.isCordova) {
      var atts = e.currentTarget.attributes;
      var isUrl = /^https?:|^unix:/
      console.log(atts);
      // && (atts.target === '_system' || atts.target === '_blank')
      if (typeof atts.target != 'undefined' || isUrl.test(atts.href)) {
        //console.log(e, d, t);
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();
        //console.log('prevented');
        console.log('opening ' + atts.href + ' in ' + atts.target);
        window.open(atts.href, atts.target);
      }
    }
  }
});
