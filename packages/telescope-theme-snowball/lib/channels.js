Telescope.callbacks.add("postSubmit", function (post) {
  if (post.categories.length === 0) {
    post.categories = null;
  } else {
    //post.categories = [post.categories[0]];
    post.categories = post.categories;
  }
  return post;
});

//todo: will this work at scale?
if (Meteor.isClient) {
  Telescope.callbacks.add("postsParameters", function (parameters, terms) {

    // console.log('parameters: ', parameters, 'terms: ', terms);
    var group = Categories.findOne(FlowRouter.getParam('groupId')) || {};
    var cat = group.slug || terms.cat || terms["cat[]"];
    // console.log('cat', cat);

    // filter by category if category slugs are provided
    if (cat) {
      var categoriesIds = [];
      var find = {};

      if (typeof cat === "string") { // cat is a string
        find = {slug: cat};
      } else if (Array.isArray(cat)) { // cat is an array
        find = {slug: {$in: cat}};
      }

      // get all categories passed in terms
      var categories = Categories.find(find).fetch();

      // for each category, add its ID and the IDs of its children to categoriesId array
      categories.forEach(function (category) {
        categoriesIds.push(category._id);
        categoriesIds = categoriesIds.concat(_.pluck(category.getChildren(), "_id"));
      });
      //get parameter categories as array
      var catParams = categoriesIds;
    }
    //end from tscope

    var user = Meteor.users.findOne(terms.userId);
    var userCats = [];

    //If the user has subscribed channels, add those to allowed channels
    if (((typeof user != 'undefined' ? user.subscribedChannelsIds : void 0) != null) === true) {
      userCats = user.subscribedChannelsIds;
    }
    //include public channels
    var publicCats = _.pluck(Categories.find({isPrivate: 0}).fetch(), '_id');
    var allowedCats = _.union(publicCats, userCats);

    var shownCats;

    //If we're showing a specific channel, show only that channel (if allowed)
    if (typeof cat != 'undefined') {
      shownCats = _.intersection(allowedCats, catParams);
      //Otherwise, show subscribed channels
    } else {
      shownCats = userCats;
    }
    //console.log('shownCats:',shownCats);
    parameters.find.categories = {$in: shownCats};
    //console.log(parameters.find.categories);
    return parameters;
  });
}
