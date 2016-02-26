Template.post_tweet.onRendered(function(){

  //load twitter widget js
  window.twttr = (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
      t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function(f) {
      t._e.push(f);
    };

    return t;
  }(document, "script", "twitter-wjs"));
  //detect tweet action
  //twttr.ready(function (twttr) {
  //  twttr.events.bind(
  //    'tweet',
  //    function (event) {
  //      // Do something there
  //      console.log('tweet tweet', event);
  //
  //    }
  //  );
  //});
});

Template.post_tweet.helpers({
  encodedTitle: function () {
    return encodeURIComponent(this.title);
  },
  sourceLink: function () {
    return !!this.url ? this.url : Posts.getPageUrl(this);
  },
  viaTwitter: function () {
    //%40
    return !!Settings.get('twitterAccount') ? 'via='+Settings.get('twitterAccount') : '';
  },
  channel: function(){
    if(this.categories.length){
      var cat = Categories.findOne(this.categories[0]);
      cat = cat.slug.replace(/\-/g,'');
      return '%23' + cat + '%20';
    }
  }
});

Template.post_tweet.events({
  'click .tweet-post': function(e,t){
    Meteor.call('updateShareCount', this._id, function(err,res){
      if(err){
        console.log(err);
      } else {
        console.log(res);
      }
    });
  }
});
