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
  upvote: "icon-chevron-up",
  voted: "check",
  downvote: "icon-chevron-down",
  facebook: "icon-Facebook-1",
  twitter: "icon-social-twitter-outline",
  googleplus: "google-plus",
  linkedin: "linkedin-square",
  comment: "icon-bubble", //updated with linearicon (ML)
  share: "share-square-o",
  more: "ellipsis-h",
  menu: "bars",
  subscribe: "envelope-o",
  delete: "trash-o",
  edit: "pencil",
  popularity: "fire",
  time: "icon-clock3", //updated
  best: "star",
  search: "icon-magnifier",
  edit: "pencil",
  approve: "check-circle-o",
  reject: "times-circle-o",
  views: "eye",
  clicks: "mouse-pointer",
  score: "icon-podium"
};
