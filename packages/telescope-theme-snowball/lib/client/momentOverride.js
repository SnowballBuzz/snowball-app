moment.locale('en', {
  relativeTime: {
    future: "in %s",
    past: "%s",
    s: "%ds",
    m: "%dm",
    mm: "%dm",
    h: "%dh",
    hh: "%dh",
    d: "%dd",
    dd: function (number) {
      var weeks = Math.round(number / 7);
      if (number < 7) {
        // if less than a week, use days
        return number + "d";
      } else {
        // to pluralize weeks :
        // return weeks + "w" + (weeks === 1 ? "" : "s");
        // disabled for compressed dates
        return weeks + "w";
      }
    },
    M: "%dmo",
    MM: "%dmo",
    y: "%dy",
    yy: "%dy"
  }
});
