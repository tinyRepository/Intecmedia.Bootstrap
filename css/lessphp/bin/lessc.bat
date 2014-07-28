@echo off
set PHP_HOME=Z:\usr\local\php5\
%PHP_HOME%php.exe -c %PHP_HOME%php.ini -f %~dp0\lessc.php -- %*