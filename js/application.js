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
        "bootstrap": "bootstrap.min",
        "datetimepicker": "bootstrap-datetimepicker.min",
        "jquery.migrate": "jquery-migrate.min",
        "moment": "moment.min",
        "selectize": "selectize.min"
    },
    shim: {
        "datetimepicker": ["bootstrap", "moment"],
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

/* Datetimepicker */
require(["jquery", "moment", "datetimepicker"], function($) {
    "use strict";

    $.fn.datetimepicker.defaults = $.extend(true, {}, $.fn.datetimepicker.defaults, {
        showClear: true,
        showTodayButton: true,
        locale: moment.locale("ru"),
        icons: {
            time: "fa fa-clock-o",
            date: "fa fa-calendar",
            up: "fa fa-caret-up",
            down: "fa fa-caret-down",
            previous: "fa fa-caret-left",
            next: "fa fa-caret-right",
            today: "fa fa-crosshairs",
            clear: "fa fa-times"
        }
    });

    $(document).on(
        "focus.datetimepicker.data-api click.datetimepicker.data-api",
        "input[data-provide=\"datetimepicker\"]",
        function (event) {
            var self = $(this);
            var datetimepicker = self.data("DateTimePicker") || self.datetimepicker();
            event.preventDefault();
            datetimepicker.show();
        }
    );
});

/* Selectize */
require(["jquery", "selectize"], function($) {
    "use strict";

    $("select.form-control:not(.form-select)").each(function() {
        var select = $(this), options = {plugins: {}};
        if (select.prop("multiple")) {
            options.hideSelected = false;
            options.plugins["remove_button"] = {};
        }
        options.allowEmptyOption = true;
        options = $.extend(true, {}, options, select.data());
        select.selectize(options);
    });
});
