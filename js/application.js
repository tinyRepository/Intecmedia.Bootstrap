/*! Intecmedia.Bootstrap  | (c) 2014 Intecmedia. | license public domain */
if (/^(file|chrome(-extension)?|resource|qrc|app):/.test(location.protocol)) {
    (function() {
        var links = document.getElementsByTagName("link");
        var head = document.getElementsByTagName("head")[0];
        var script = document.createElement("script");
        script.src = "js/less.js";
        script.type = "text/javascript";
        script.onload = function() {
            window.less.env = "development";
            for (var i = 0; i < links.length; i++) {
                if (links[i].href.match(/.less$/)) {
                    window.less.sheets.push(links[i]);
                    head.removeChild(links[i]);
                }
            }
            window.less.refresh();
        };
        head.appendChild(script);
    })();
}

jQuery(function($) {
    var wnd = $(window);
    var doc = $(document);

});