# Intecmedia Bootstrap
Это внутренний стандарт/шаблон для верстки сайтов компании [Intecmedia](http://intecmedia.ru)

## Особености:
* основан на Bootstrap 2.3.2 
* встроен jQuery v1.11.1
* основан на LESS (для обработки на клиенте используется less.js, на сервере lessphp)
* встроена работа с media=print, responsive-css и HTML5-разметки (для IE используется HTML5 Shiv)
* содержит базовую типографику текста, форм, таблиц, списков, заголовков
* совсместимо со всеми современными браузерами (минимальная версия Internet Exploere это 8 -- используйте классы `.lt-ie9`, `.lt-ie8` и `.lt-ie7`)

## Примечания:
* перед началом работы определите основные переменные в файле `css/variables.less`
* дополнительный css должен содержатся в файле `css/style.less`
* для responsive-макетов разкоментируйте строку `@import "responsive.less";` в файле `css/style.less`
* дополнительный javascript должен содержатся в `css/application.js`

## Если не работает Less.js в Chrome
Ошибка в консоли браузера: `Cross origin requests are only supported for HTTP`. 
Для просмотра html используйте веб-сервер или перезапустить хром с опцией `chrome -allow-file-access-from-files`.

## Стилистика кода

### CSS
* отступы в четыре пробела
* каждый селектор находится на отдельной строке
* открывающя скобка находится на одной строке с слектором
* закрывающая скобка находится на отедельной строке после атрибутов стилей
* крупные блоки заключаются в открывающий и закрывающий комментарий

#### пример
```css
/* block */
.block {
    font-size:14px;  
    width:100px;  
}
.block .block-inner {
    color:#0000FF;
    border:1px solid #FF0000;
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
<!-- block -->
<div class="block">
    Inline <a href="#">text</a> on one line.
    <div class="block-inner">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
    </div>
</div>
<!-- /block -->
```

### Javascript
* отсупы в четыре пробела
* остальные подробности описаны в [jQuery JavaScript Style Guide](http://contribute.jquery.org/style-guide/js/)


## Компоненты:
* [Bootstrap](http://getbootstrap.com/2.3.2): Apache License v2.0
* [lessphp](http://leafo.net/lessphp): MIT/GPL3 Licensed
* [less.js](http://lesscss.org ): MIT/GPL3 Licensed
* [jQuery](http://jquery.com/): MIT/GPL license
* [HTML5 Shiv](https://code.google.com/p/html5shiv/): MIT/GPL2 Licensed
* [Respond.js](https://github.com/scottjehl/Respond): MIT Licensed


