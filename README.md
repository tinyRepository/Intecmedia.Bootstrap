# [Intecmedia.Bootstrap HTML Template](https://github.com/intecmedia/Intecmedia.Bootstrap)

Это внутренний стандарт/шаблон для верстки сайтов компании [Intecmedia](http://intecmedia.ru)

## **ВНИМАНИЕ!** Данные стандарты это не просто рекомендации, а **требования при сдаче работы**. 

Отнеситесь к прочтению внимательно, да бы не терять свое и чужое время. 

Предложения и замечания приветствуются в разделе [Issues](https://github.com/Intecmedia/Intecmedia.Bootstrap/issues/new) или [Pull requests](https://github.com/intecmedia/Intecmedia.Bootstrap/pulls).

## Особености:
* Основан на Bootstrap 3.3
* Встроен jQuery v1.11
* Встроен Font Awesome 4.2.0
* Модульный AMD-подход(Asynchronous Module Definition) в организации Javascript через RequireJS
* Основан на LESS (для обработки на клиенте используется less.js, на сервере lessphp)
* Встроена работа с media=print, responsive-css и HTML5-разметки
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
Для создания нестандартных сеток используйте grid-framework:
```less
.content {
    @content-gutter: 60px;
    .make-row(@content-gutter);
    > .content-main {
        .make-xs-column(12; @content-gutter);
        .make-sm-column(8; @content-gutter);
        .make-md-column(8; @content-gutter);
        .make-lg-column(6; @content-gutter);
    }
    > .content-secondary {
        .make-xs-column(12; @content-gutter);
        .make-sm-column(4; @content-gutter);
        .make-md-column(4; @content-gutter);
        .make-lg-column(6; @content-gutter);
    }
}
```

Еще один пример 5-колонник:
```less
.five-row {
    @columns: 5;
    @gutter: 30px;
    .make-row(@gutter);
    .col-lg-1-5 {
        .make-lg-column(1, @columns, @gutter);
    }
    .col-md-1-5 {
        .make-md-column(1, @columns, @gutter);
    }
    .col-sm-1-5 {
        .make-sm-column(1, @columns, @gutter);
    }
    .col-xs-1-5 {
        .make-xs-column(1, @columns, @gutter);
    }
}
```

Другие mixin-ы могут быть интересны:
```less
.x-make-grid(@class, @columns, @gutter-width, @prefix: "> .col");
.x-make-grid-widths(@class, @columns, @gutter-width, @prefix);
.x-make-grid-pulls(@class, @columns, @gutter-width, @prefix);
.x-make-grid-pushs(@class, @columns, @gutter-width, @prefix);
.x-make-grid-offsets(@class, @columns, @gutter-width, @prefix);

.x-make-xs-column(@columns, @grid-columns, @gutter-width);
.x-make-xs-column-offset(@columns, @grid-columns);
.x-make-xs-column-push(@columns, @grid-columns);
.x-make-xs-column-pull(@columns, @grid-columns);

.x-make-sm-column(@columns, @grid-columns, @gutter-width);
.x-make-sm-column-offset(@columns, @grid-columns);
.x-make-sm-column-push(@columns, @grid-columns);
.x-make-sm-column-pull(@columns, @grid-columns);

.x-make-md-column(@columns, @grid-columns, @gutter-width);
.x-make-md-column-offset(@columns, @grid-columns);
.x-make-md-column-push(@columns, @grid-columns);
.x-make-md-column-pull(@columns, @grid-columns);

.x-make-lg-column(@columns, @grid-columns, @gutter-width);
.x-make-lg-column-offset(@columns, @grid-columns);
.x-make-lg-column-push(@columns, @grid-columns);
.x-make-lg-column-pull(@columns, @grid-columns);
```

Для создания адаптивной верстки используйте screen-mixin: `screen-xs`, `screen-sm`, `screen-sm-max`, `screen-md`, `screen-md-max` и `screen-lg`.
```less
.foo {
    width: 200px;  
    .screen-xs({
        width: 100px;
    });
}
```
## **ВНИМАНИЕ!** Данные миксины призваны стандартизовать величины width в media query, однако это требует особого контроля за **количество запоросов**. 


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
* Использовать разметку Schema.org для следующего:
    * [Адреса и Организации](http://help.yandex.ru/webmaster/supported-schemas/address-organization.xml)
    * [Видео](http://help.yandex.ru/webmaster/supported-schemas/video.xml)
    * [Вопросы и Ответы](http://help.yandex.ru/webmaster/supported-schemas/questions.xml)
    * [Товары и Цены](http://help.yandex.ru/webmaster/supported-schemas/goods-prices.xml)
    * [Картинки](http://help.yandex.ru/webmaster/supported-schemas/image.xml)

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
