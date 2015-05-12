/*! Intecmedia.Bootstrap  | (c) 2015 Intecmedia. | license public domain */

/* Run less.js parser for only file protocol */
(function() {
    "use strict";
    if (window.location.protocol !== "file:") {
        return;
    }
    var startTime = new Date(), html = jQuery("html").css("opacity", 0);
    jQuery.ajax("js/less.js", {
        async: false,
        dataType: "script",
        success: function() {
            less.logLevel = 2;
            jQuery("link[rel~='stylesheet'][href$='.less']").each(function() {
                less.sheets.push(this);
                jQuery(this).remove();
            });
            less.refresh();
            html.css("opacity", 1);
            less.poll = 1.5 * (new Date() - startTime);
        }
    });
})();

/* Get base url for modules */
var getBaseUrl = function() {
    "use strict";
    if (window.getBaseUrlPath) {
        return window.getBaseUrlPath;
    }
    var pattern = /(^|.*[\\\/])application\.js(?:\?.*|;.*)?$/i;
    var path = "", scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
        var match = scripts[i].src.match(pattern);
        if (match) {
            path = match[1];
            break;
        }
    }
    if (path.indexOf(":/") == -1 && path.slice(0, 2) != "//") {
        if (path.indexOf("/") === 0) {
            path = location.href.match(/^.*?:\/\/[^\/]*/)[0] + path;
        } else {
            path = location.href.match(/^[^\?]*\/(?:)/)[0] + path;
        }
    }
    window.getBaseUrlPath = path;
    return path;
};

/* Define modules */
require.config({
    baseUrl: getBaseUrl(),
    paths: {
        "jquery.migrate": "jquery-migrate.min",
        "bootstrap": "bootstrap.min"
    },
    shim: {
    }
});

/* Define jQuery module */
define("jquery", [], function() {
    return jQuery;
});

/* Application */
require(["jquery"], function($, Selectize) {
    "use strict";
    var wnd = $(window), doc = $(document);
    /* application code here */


});
