/*! Intecmedia.Bootstrap  | (c) 2014 Intecmedia. | license public domain */
if (/^(file|chrome(-extension)?|resource|qrc|app):/.test(location.protocol)) {
    jQuery.ajax({
        cache: true,
        url: "js/less.js",
        dataType: "script",
        success: function() {
            less.env = 'development';
            jQuery('link.less').each(function() {
                less.sheets.push(this);
            });
            less.refresh();
        }
    });
}

jQuery(function($) {
    var wnd = $(window);
    var doc = $(document);

});