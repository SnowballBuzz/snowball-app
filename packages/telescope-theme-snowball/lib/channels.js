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
Telescope.callbacks.add("postsParameters", function (parameters, terms) {

  //from tscope
  var cat = terms.cat || terms["cat[]"];
  //console.log('cat', cat);

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
  var allowedCats = [];

  //If the user has subscribed channels, add those to allowed channels
  if (((user != null ? user.subscribedChannelsIds : void 0) != null) === true) {
    allowedCats = user.subscribedChannelsIds;
  }
  //include public channels
  var publicCats = _.pluck(Categories.find({isPrivate: 0}).fetch(), '_id');
  allowedCats = _.union(publicCats, allowedCats);

  var shownCats;

  //if we're showing a specific channel
  if(typeof cat != 'undefined'){
    shownCats = _.intersection(allowedCats, catParams);
  } else {
    shownCats = allowedCats;
  }
  //console.log('shownCats:',shownCats);
  parameters.find.categories = {$in: shownCats};
  //console.log(parameters.find.categories);
  return parameters;
});
