Herald.addCourier('xPosts', {
  media: {
    email: {
      emailRunner: function (user) {
        console.log()
        //var properties = Posts.getNotificationProperties(this.data.post);
        var post = this.data.post;
        var subject = 'The idea "' + post.title + '" has ' + post.upvotes + ' upvotes!';
        var html = Telescope.email.buildTemplate(
          'The idea  "<a href="https://app.snowball.buzz/posts/' + post._id + '">' + post.title + '</a>" has ' + post.upvotes + ' upvotes. <br>');
        Telescope.email.send(Users.getEmail(user), subject, html);
      }
    },
    onsite: {} //Send notifications to client, with no custom configuration
  },

  //will be a function on the collection instance, returned from find()
  message: function () {
    return "Contrats! Your post has " + this.data.post.upvotes + ' upvotes!';
  }
});
