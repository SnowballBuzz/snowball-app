Telescope.utils.getIcon = function (iconName, iconClass) {
  var icons = Telescope.utils.icons;
  var iconCode = !!icons[iconName] ? icons[iconName] : iconName;
  var iconClass = (typeof iconClass === 'string') ? ' '+iconClass : '';
  return '<i class="icon ' + iconCode + ' icon-' + iconName + iconClass+ '" aria-hidden="true"></i>';
};



Telescope.utils.icons = {
  expand: "chevron-right", //?
  collapse: "chevron-down", //?
  next: "chevron-right",  //?
  close: "clock3", //is this the right one to use?
  upvote: "icon-chevron-up", //updated
  voted: "check", //?
  downvote: "icon-chevron-down", //updated
  facebook: "icon-Facebook-1", //updated
  twitter: "icon-social-twitter-outline", //updated
  googleplus: "google-plus", //NON EXISTENT!
  linkedin: "linkedin-square", //!
  comment: "icon-bubble", //updated with linearicon (ML)
  share: "share2", //updated
  more: "ellipsis", //updated
  menu: "icon-menu", //updated
  subscribe: "icon-register",
  delete: "icon-eraser", //updated
  edit: "icon-pencil", //updated
  popularity: "icon-bullhorn", //updated
  time: "icon-clock3", //updated
  best: "icon-star", //updated
  search: "icon-magnifier", //updated
  filter: "icon-funnel", //added!
  approve: "icon-check", //updated
  reject: "icon-cross2", //updated
  views: "icon-eye", //updated
  clicks: "icon-spotlights",
  score: "icon-podium"
};
