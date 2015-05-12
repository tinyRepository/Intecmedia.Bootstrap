/*! Intecmedia.Bootstrap  | (c) 2015 Intecmedia. | license public domain */

/* Base modules url */
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

(function() {
    "use strict";
    /* Run less.js parser for only file protocol */
    if (window.location.protocol !== "file:") {
        return;
    }
    var define = window.define;
    window.define = null;
    var startTime = new Date(), html = jQuery("html").css("opacity", 0);
    jQuery.ajax(getBaseUrl() + "less.js", {
        async: false,
        dataType: "script",
        success: function() {
            window.define = define;
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
require(["jquery", "bootstrap"], function($) {
    "use strict";
    var wnd = $(window), doc = $(document);

    /* APPLICATION CODE HERE */

});