# Intecmedia Bootstrap

Это внутренний стандарт/шаблон для верстки сайтов компании [Intecmedia](http://intecmedia.ru)

## Особености:
* основан на Bootstrap 2.3.2 
* встроен jQuery v1.11.1
* основан на LESS (для обработки на клиенте используется less.js, на сервере lessphp)
* встроена работа с media=print, responsive-css и HTML5-разметки (для IE используется HTML5 Shiv)
* содержит базовую типографику текста, форм, таблиц, списков, заголовков
* совсместимо со всеми современными браузерами (минимальная версия Internet Exploere это 8 -- используйте классы .lt-ie9 .lt-ie8 .lt-ie7)

## Примечания:
* перед началом работы определите основные переменные в файле `css/variables.less`
* дополнительный css должен содержатся в файле `css/style.less`
* для responsive-макетов разкоментируйте строку `@import "responsive.less";` в `файле css/style.less`
* дополнительный javascript должен содержатся в `css/application.js`

## Если не работает Less.js в Chrome
Если в консоли браузера: `Cross origin requests are only supported for HTTP`. 
Для просмотра html используйте веб-сервер или перезапустить хром с опцией `chrome -allow-file-access-from-files`.

## Компоненты:
* [Bootstrap](http://getbootstrap.com/2.3.2): Apache License v2.0
* [lessphp](http://leafo.net/lessphp): MIT/GPL3 Licensed
* [less.js](http://lesscss.org ): MIT/GPL3 Licensed
* [jQuery](http://jquery.com/): MIT/GPL license
* [HTML5 Shiv](https://code.google.com/p/html5shiv/): MIT/GPL2 Licensed
* [Respond.js](https://github.com/scottjehl/Respond): MIT Licensed


