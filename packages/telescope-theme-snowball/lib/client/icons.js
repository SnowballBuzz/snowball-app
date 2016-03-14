Telescope.utils.getIcon = function (iconName, iconClass) {
  var icons = Telescope.utils.icons;
  var iconCode = !!icons[iconName] ? icons[iconName] : iconName;
  var iconClass = (typeof iconClass === 'string') ? ' '+iconClass : '';
  return '<i class="icon ' + iconCode + ' icon-' + iconName + iconClass+ '" aria-hidden="true"></i>';
};



Telescope.utils.icons = {
  expand: "angle-right",
  collapse: "angle-down",
  next: "angle-right",
  close: "times",
  upvote: "icon-chevron-up", //updated
  voted: "check",
  downvote: "icon-chevron-down", //updated
  facebook: "icon-Facebook-1", //updated
  twitter: "icon-social-twitter-outline", //updated
  googleplus: "google-plus",
  linkedin: "linkedin-square",
  comment: "icon-bubble", //updated with linearicon (ML)
  share: "share-square-o",
  more: "ellipsis-h",
  menu: "bars",
  subscribe: "envelope-o",
  delete: "trash-o",
  edit: "icon-pencil4", //updated
  popularity: "fire",
  time: "icon-clock3", //updated
  best: "star",
  search: "icon-magnifier", //updated
  approve: "check-circle-o",
  reject: "times-circle-o",
  views: "eye",
  clicks: "mouse-pointer",
  score: "icon-podium"
};
