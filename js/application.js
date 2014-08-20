/*! Intecmedia.Bootstrap  | (c) 2014 Intecmedia. | license public domain */
"use strict";
/* Run less.js parser for only file protocol */
(window.location.protocol === "file:") && (function() {
    var startTime = new Date();
    // config less-parser
    window.less = {env: "development", dumpLineNumbers: "comments", logLevel: 2};
    var html = jQuery("html").css("opacity", 0);
    // run less-parser
    jQuery.getScript("js/less.js", function() {
        jQuery("link[rel~='stylesheet'][href$='.less']").each(function(){
            window.less.sheets.push(this);
            jQuery(this).remove();
        });
        window.less.refresh();
        html.css("opacity", 1);
        // watch mode
        window.less.poll = 1.5 * (new Date() - startTime);
    });
})();

/* Application */
jQuery(function($) {
    var wnd = $(window), doc = $(document);
    /* addtional code here */


});

