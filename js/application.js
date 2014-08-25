/*! Intecmedia.Bootstrap  | (c) 2014 Intecmedia. | license public domain */
"use strict";
/* Run less.js parser for only file protocol */
(window.location.protocol === "file:") && (function() {
    less.logLevel = 2;
    var startTime = new Date(), html = jQuery("html").css("opacity", 0);
    jQuery("link[rel~='stylesheet'][href$='.less']").each(function(){
        less.sheets.push(this);
        jQuery(this).remove();
    });
    less.refresh();
    html.css("opacity", 1);
    less.poll = 1.5 * (new Date() - startTime);
})();

/* Application */
jQuery(function($) {
    var wnd = $(window), doc = $(document);
    /* addtional code here */


});
