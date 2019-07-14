'use strict';

module.exports = function(/* environment, appConfig */) {
  // See https://github.com/zonkyio/ember-web-app#documentation for a list of
  // supported properties

  return {
    name: "Sentrybills",
    short_name: "Sentrybills",
    description: "",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "https://imgur.com/V6In2jI.png",
        sizes: "540x540",
        type: "image/png"
      }
    ],
    ms: {
      tileColor: '#fff'
    }
  };
}
