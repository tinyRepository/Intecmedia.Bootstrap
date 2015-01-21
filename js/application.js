/*! Intecmedia.Bootstrap  | (c) 2015 Intecmedia. | license public domain */
/* Run less.js parser for only file protocol */
if (window.location.protocol === "file:") {
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
}

/* Application */
jQuery(function($) {
    "use strict";
    var wnd = $(window), doc = $(document);
    /* addtional code here */


});
