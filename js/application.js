/*! Intecmedia.Bootstrap  | (c) 2016 Intecmedia. | license public domain */

/* Define modules */
require.config({
    baseUrl: "js",
    paths: {
        "bootstrap": "bootstrap.min",
        "datetimepicker": "bootstrap-datetimepicker.min",
        "moment": "moment.min",
        "picturefill": "picturefill.min",
        "selectize": "selectize.min"
    },
    shim: {
        "selectize.init": ["selectize"],
        "datetimepicker.init": ["datetimepicker"],
        "datetimepicker": ["bootstrap", "moment"]
    }
});

/* Define jQuery module */
define("jquery", [], function() {
    return jQuery;
});

/* Responsive image polyfill */
require(["picturefill"]);

/* Main application */
require(["jquery", "bootstrap"], function($) {
    "use strict";
    var wnd = $(window), doc = $(document);

    /* APPLICATION CODE HERE */
});

/* Datetimepicker input: define */
define("datetimepicker.init", ["jquery", "moment", "datetimepicker"], function($, moment) {
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
            function(event) {
                var self = $(this);
                var datetimepicker = self.data("DateTimePicker") || self.datetimepicker();
                event.preventDefault();
                datetimepicker.show();
            }
    );
});

/* Selectize input: define */
define("selectize.init", ["jquery", "selectize"], function($) {
    "use strict";

    $("select.form-control:not(.form-select)").each(function() {
        var select = $(this), options = {plugins: {}};
        if (select.prop("multiple")) {
            options.hideSelected = false;
            options.plugins.remove_button = {};
        }
        options.allowEmptyOption = true;
        options = $.extend(true, {}, options, select.data());
        select.selectize(options);
    });
});

require(["jquery"], function($) {
    /* Datetimepicker input: lazy load */
    if ($("input[data-provide=\"datetimepicker\"]").length) {
        require(["datetimepicker.init"]);
    }
    /* Selectize input: lazy load */
    if ($("select.form-control:not(.form-select)").length) {
        require(["selectize.init"]);
    }
});