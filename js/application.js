/*! Intecmedia.Bootstrap  | (c) 2014 Intecmedia. | license public domain */
"use strict";
/* Run less.js parser for only file protocol */
(function() {
    if (window.location.protocol !== "file:") return;
    var links = document.getElementsByTagName("link");
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.type = "text/javascript";
    // decorate jquery
    var $original = window.jQuery, $calls = [];
    window.jQuery = window.$ = function() {
        $calls.push([this, arguments]);
    };
    // run less-parser
    script.onload = function() {
        window.less.env = "development";
        for (var i = 0; i < links.length; i++) {
            if (links[i].rel.match(/stylesheet/i) && links[i].href.match(/.less$/i)) {
                window.less.sheets.push(links[i]);
                head.removeChild(links[i]);
            }
        }
        window.less.refresh();
        // undecorate jquery
        for (i in $calls) {
            $original.apply($calls[i][0], $calls[i][1])
        }
        window.jQuery = window.$ = $original;
    };
    script.src = "js/less.js";
    head.appendChild(script);
})();

/* IE10 viewport hack for Surface/desktop Windows 8 bug: http://getbootstrap.com/getting-started/#support-ie10-width */
(function() {
    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
        var style = document.createElement("style")
        style.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}"))
        document.querySelector("head").appendChild(style)
    }
})();

/* Application */
jQuery(function($) {
    var wnd = $(window), doc = $(document);


});