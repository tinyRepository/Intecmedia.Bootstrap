# Intecmedia Bootstrap

Ёто внутренний стандарт/шаблон дл€ верстки сайтов компании Intecmedia

Link: http://intecmedia.ru
License: Public Domain

## ќсобености:
* основан на Bootstrap 2.3.2 
* встроен jQuery v1.11.1
* основан на LESS (дл€ обработки на клиенте используетс€ less.js)
* встроена работа с media=print, responsive-css и HTML5-разметки (дл€ IE используетс€ HTML5 Shiv)
* содержит базовую типографику текста, форм, таблиц, списков, заголовков
* совсместимо со всеми современными браузерами (минимальна€ верси€ Internet Exploere это 8 -- используйте классы .lt-ie9 .lt-ie8 .lt-ie7)

## ѕримечани€:
* перед началом работы определите основные переменные в файле css/variables.less 
* дополнительный css должен содержатс€ в файле css/style.less
* дл€ responsive-макетов разкоментируйте строку @import "responsive.less"; в файле css/style.less
* дополнительный javascript должен содержатс€ в css/application.js

## ≈сли не работает Less.js в Chrome
¬ консоли браузера видно такого рода ошибку: XMLHttpRequest cannot load file:///.../Intecmedia.Bootstrap/css/styles.less. Cross origin requests are only supported for HTTP.
–ешение проблемы: дл€ просмотра страниц используйте веб-сервер или перезапустить хром с опцией chrome -allow-file-access-from-files