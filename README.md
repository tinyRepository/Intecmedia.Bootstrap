# [Intecmedia.Bootstrap HTML Template](https://github.com/intecmedia/Intecmedia.Bootstrap)
Это внутренний стандарт/шаблон для верстки сайтов компании [Intecmedia](http://intecmedia.ru)

## Особености:
* Основан на Bootstrap 3.3
* Встроен jQuery v1.11
* Встроен Font Awesome 4.2.0
* Модульный AMD-подход(Asynchronous Module Definition) в организации Javascript через RequireJS
* Основан на LESS (для обработки на клиенте используется less.js, на сервере lessphp)
* Встроена работа с media=print, responsive-css и HTML5-разметки (для IE используется HTML5 Shiv)
* Содержит базовую типографику текста, форм, таблиц, списков, заголовков
* Совсместимо со всеми современными браузерами (минимальная версия Internet Explorer 9)
* Для поля ввода даты используется [Bootstrap Datepicker](https://eonasdan.github.io/bootstrap-datetimepicker/)
* Для замены select-полей используется  [Selectize](http://brianreavis.github.io/selectize.js/)
* Responsive images через [Picturefill](http://scottjehl.github.io/picturefill)

## Примечания:
* Ваша задача состоит в стилизации bootstrap.
* Не следует разрушать стандартные компоненты bootstrap, они будут использоваться многовариантно.
* Перед началом работы определите основные переменные в файле `css/variables.less`
* Дополнительный css должен содержатся в файле `css/style.less`
* Дополнительный javascript должен содержатся в `js/application.js` и загружаться через RequireJS

## Если не работает Less.js в Chrome
Ошибка в консоли браузера: `Cross origin requests are only supported for HTTP`. 
Для просмотра html используйте веб-сервер или перезапустить хром с параметром `-allow-file-access-from-files`.

## Если не работает Less.js в Opera Presto
Должен быть включен флаг `opera:config#UserPrefs|AllowFileXMLHttpRequest`.

## Watch mode
Для включение watch-режима запустите в консоли браузера следующией: window.less.watch()

## Responsive
Для создания адаптивной верстки используйте screen-mixin: `screen-xs`, `screen-sm`, `screen-sm-max`, `screen-md`, `screen-md-max` и `screen-lg`.
```less
.foo {
    width: 200px;  
    .screen-xs({
        width: 100px;
    });
}
```


## Стилистика кода

### CSS/Less
* Отступы в четыре пробела
* Каждый селектор находится на отдельной строке
* Открывающя скобка находится на одной строке с слектором
* Закрывающая скобка находится на отедельной строке после атрибутов стилей
* Крупные блоки заключаются в открывающий и закрывающий комментарий
* Остальные подробности описаны в [Principles of writing consistent, idiomatic CSS](https://github.com/necolas/idiomatic-css/tree/master/translations/ru-RU).

#### пример
```less
/* block */
.foo,
.bar {
    font-size: 14px;  
    width: 100px;  
    .bar-inner {
        color: #0000FF;
        border: 1px solid #FF0000;
    }
}
/* /block */
```

### HTML
* Отступы в четыре пробела.
* Не делайте отсутупы внутри `html`, `body`, `script`, or `style`. отступы только в `head` и других элементах.
* Атрибуты заключены в двойные ковычки.
* Все блочные теги на отедельной строке.
* Крупные блоки заключаются в открывающий и закрывающий комментарий.
* Остальные подробности описаны в [jQuery HTML Style Guide](http://contribute.jquery.org/style-guide/html/).

#### пример
```html
<!doctype html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <title>Intecmedia.Bootstrap</title>
    <meta name="author" content="">
    <meta name="description" content="">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet/less" href="css/style.less" />
    <script>
    $(function() {
        $("p").text( document.title );
    });
    </script>
    <script src="js/jquery.js"></script>
</head>
<body>
<p>Hello there!<p>
</body>
</html>
```

### Javascript
* Отсупы в четыре пробела
* Остальные подробности описаны в [jQuery JavaScript Style Guide](http://contribute.jquery.org/style-guide/js/)
* Модульный AMD-подход(asynchronous module definition) в организации Javascript через RequireJS
```javascript
require(["jquery", "bootstrap"], function($) {
    "use strict";
    var wnd = $(window), doc = $(document);
    $("[data-toggle=tooltip]").tooltip();
});
```

## Компоненты:
* [Bootstrap](http://getbootstrap.com/): Apache License v2.0
* [Less.php](http://lessphp.gpeasy.com): Apache License v2.0
* [less.js](http://lesscss.org ): MIT/GPL3 Licensed
* [jQuery](http://jquery.com/): MIT/GPL license
* [HTML5 Shiv](https://code.google.com/p/html5shiv/): MIT/GPL2 Licensed
* [Respond.js](https://github.com/scottjehl/Respond): MIT Licensed
* [es5-shim](https://github.com/es-shims/es5-shim): MIT Licensed
* [Font Awesome](http://fortawesome.github.io/Font-Awesome/): MIT License
* [Pace](http://github.hubspot.com/pace/): MIT License
* [RequireJS](http://requirejs.org/): MIT License
* [Bootstrap Datepicker](https://eonasdan.github.io/bootstrap-datetimepicker/): MIT License
* [Selectize](http://brianreavis.github.io/selectize.js/): Apache License
* [Picturefill](http://scottjehl.github.io/picturefill): MIT License

## Ссылки:
* [Less](http://lesscss.org/)
* [Intecmedia.Bootstrap HTML Template](https://github.com/intecmedia/Intecmedia.Bootstrap)
* [jQuery JavaScript Style Guide](http://contribute.jquery.org/style-guide/js/)
* [jQuery HTML Style Guide](http://contribute.jquery.org/style-guide/html/).
* [Principles of writing consistent, idiomatic CSS](https://github.com/necolas/idiomatic-css/tree/master/translations/ru-RU).
* [Asynchronous Module Definition](https://github.com/amdjs/amdjs-api/wiki/AMD).
* [Модульный подход к разработке web-приложений с использованием JavaScript: AMD и RequireJS](http://habrahabr.ru/post/152833/).
* [Picturefill 2.0: Responsive Images And The Perfect Polyfill](http://www.smashingmagazine.com/2014/05/12/picturefill-2-0-responsive-images-and-the-perfect-polyfill/).