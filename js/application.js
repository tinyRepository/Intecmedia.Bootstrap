/*! Intecmedia.Bootstrap  | (c) 2014 Intecmedia. | license public domain */
(function() {
    if (window.location.protocol !== "file:") return;
    var links = document.getElementsByTagName("link");
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.onload = function() {
        window.less.env = "development";
        for (var i = 0; i < links.length; i++) {
            if (links[i].rel.match(/stylesheet/) && links[i].href.match(/.less$/)) {
                window.less.sheets.push(links[i]);
                head.removeChild(links[i]);
            }
        }
        window.less.refresh();
    };
    script.src = "js/less.js";
    head.appendChild(script);
})();

jQuery(function($) {
    var wnd = $(window);
    var doc = $(document);

});