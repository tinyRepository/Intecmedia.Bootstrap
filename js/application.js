/*! Intecmedia.Bootstrap  | (c) 2014 Intecmedia. | license public domain */
"use strict";
/* Application */
jQuery(function($) {
    var wnd = $(window), doc = $(document);
    /* addtional code here */

});

/* Run less.js parser for only file protocol */
(window.location.protocol === "file:") && (function() {
    var startTime = new Date();
    // config less-parser
    window.less = {env: "development", dumpLineNumbers: "comments", logLevel: 2};
    var html = jQuery("html").css("visibility", "hidden");
    // decorate jquery
    var $jQuery = window.jQuery, $jQueryCalls = [];
    window.jQuery = window.$ = function() {
        $jQueryCalls.push([this, arguments]);
    };
    // run less-parser
    $jQuery.getScript("js/less.js", function() {
        $jQuery("link[rel~='stylesheet'][href$='.less']").each(function(){
            window.less.sheets.push(this);
            $jQuery(this).remove();
        });
        window.less.refresh();
        html.css("visibility", "");
        // undecorate jquery
        $jQuery($jQueryCalls).each(function() {
            $jQuery.apply(this[0], this[1]);
        });
        window.jQuery = window.$ = $jQuery;
        // watch mode
        window.less.poll = 1.5 * (new Date() - startTime);
    });
})();