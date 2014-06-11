<?php
/**
 * Online less compiler
 * 
 * Simple example:
 * <link rel="stylesheet/less" href="/css/lessphp/index.php?/css/style.less" />
 *
 * Apache mod_rewrite example:
 * RewriteEngine On
 * RewriteCond %{REQUEST_FILENAME} \.less$ [NC] 
 * RewriteCond %{REQUEST_FILENAME} -f
 * RewriteRule ^(.+)$ lessphp/index.php?%{REQUEST_URI}?%{QUERY_STRING} [L]
 *
 * Apache mod_action example:
 * Action compile-less /css/lessphp/index.php
 * AddHandler compile-less .less
 *
 *
 * @copyright 2014 IntecMedia (http://www.intecmedia.ru)
 * @author Dmitry Pyatkov(aka dkrnl) <dkrnl@yandex.ru>
 */

// handle errors
error_reporting(E_ALL);
ini_set("display_errors", true);
set_error_handler(function ($code, $message, $file, $line) {
    if (0 != error_reporting()) {
        throw new ErrorException($message, 0, $code, $file, $line);
    }
});

header("Content-Type: text/css; charset=UTF-8");
header("Cache-Control: must-revalidate");

// input file
$input = "";
$docroot = $_SERVER["DOCUMENT_ROOT"];
if (isset($_SERVER["PATH_TRANSLATED"]) && $_SERVER["PATH_TRANSLATED"]) {
    // from mod-action
    $input = $_SERVER["PATH_TRANSLATED"];
} elseif (isset($_SERVER["QUERY_STRING"]) && $_SERVER["QUERY_STRING"]) {
    // from query string
    $input = parse_url("http://localhost/" . ltrim($_SERVER["QUERY_STRING"], "/"));
    $input = (is_array($input) && isset($input["path"]) ? $docroot . $input["path"] : "");
}
// win32 
if (DIRECTORY_SEPARATOR != "/") {
    $input = str_replace(DIRECTORY_SEPARATOR, "/", $input);
    $docroot = str_replace(DIRECTORY_SEPARATOR, "/", $docroot);
}
// check browser gzip encoding
$gzip = function_exists("ob_gzhandler") && isset($_SERVER["HTTP_ACCEPT_ENCODING"]) && false !== strpos($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip");
// cache directory
$cachedir = dirname(__FILE__) . DIRECTORY_SEPARATOR . "cache";
$cachettl = (time() - 3600);

try {
    // clear expired cache
    if (($glob = glob($cachedir . "/less.*.css")) != false) {
        foreach ($glob as $i) {
            if (is_file($i) && filectime($i) < $cachettl) {
                unlink($i);
            }
        }
    }
    // security check
    if (!$input || strpos($input, $docroot) !== 0) {
        throw new Exception("Input less-file required", 403);
    }
    $ext = strtolower(pathinfo($input, PATHINFO_EXTENSION));
    if (!($ext == "css" || $ext == "less")) {
        throw new Exception("Input less-file required", 403);
    }
    // file not found
    if (!is_file($input)) {
        throw new Exception("File '$input' not exists", 404);
    }
    // output cache-file
    $output = $cachedir . DIRECTORY_SEPARATOR . "less" . urlencode(substr($input, strlen($docroot))). ".css";
    if (!is_writable($cachedir)) {
        throw new Exception("Less cache '$output' is not writable");
    }
    $parse = true;
    // read cached-file
    if (!(!is_file($output) || filemtime($input) > filemtime($output))) {
        $mtime = filemtime($output);
        $css = file_get_contents($output);
        $files = array();
        // read parsed less-files
        if (preg_match("~^/\\*(\\{[^\\}]+\\})\\*/~", $css, $matches)) {
           $files = json_decode($matches[1]);
           $parse = false;
        }
        // check modified less-files 
        foreach ($files as $k =>$v) {
            if (!is_file($docroot . $k) || filemtime($docroot . $k) > $v) {
                $parse = true;
            }
        }
        if (!$parse) {
            if (isset($_SERVER["HTTP_IF_MODIFIED_SINCE"]) && strtotime($_SERVER["HTTP_IF_MODIFIED_SINCE"]) >= $mtime) {
                header("HTTP/1.0 304 Not Modified");
            } else {
                header("Last-Modified: " . gmdate("D, d M Y H:i:s", $mtime) . " GMT");
                // check browser gzip encoding
                if ($gzip) {
                    ob_start("ob_gzhandler");
                }
                echo "/* Generated by LESS css compiler: " . gmdate("r", $mtime) . " */\n", $css;
            }
            return;
        }
    }

    // parse less-file
    if ($parse) {
        include_once dirname(__FILE__) . DIRECTORY_SEPARATOR . "lib" . DIRECTORY_SEPARATOR . "Less.min.php";
        $parser = new Less_Parser();
        $parser->parseFile($input);
        $css = $parser->getCss();
        // write parsed less-files
        $files = array();
        foreach (array(__FILE__, $input) + Less_Parser::AllParsedFiles() as $file) {
           $mtime = filemtime($file);
           if (DIRECTORY_SEPARATOR != "/") {
              $file = str_replace(DIRECTORY_SEPARATOR, "/", $file);
           }
           $file = substr_replace($file, "", 0, strlen($docroot));
           $files[] = json_encode($file) . ":" . intval($mtime);
        }
        $files = implode(",\n", $files);
        $css = "/*{\n$files\n}*/\n"  . $css;
        file_put_contents($output, $css);
        header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
        // check browser gzip encoding
        if ($gzip) {
            ob_start("ob_gzhandler");
        }
        echo "/* Generated by LESS css compiler: " . gmdate("r") . " */\n", $css;
        return;
    }
} catch (Exception $exception) {
    // handle exception
    $statusCode = $exception->getCode();
    if ($statusCode != 403 && $statusCode != 404 && $statusCode != 500) {
        $statusCode = 200;
    }
    $error = "LESS compile error: " . $exception->getMessage() . " at " . $exception->getFile() . ":" . $exception->getLine();
    if (DIRECTORY_SEPARATOR != "/") {
        $error = str_replace(DIRECTORY_SEPARATOR, "/", $error);
    }
    $error = strtr($error, array($docroot => "%DOCUMENT_ROOT%"));
    header("Content-Type: text/css; charset=UTF-8", true, $statusCode);
    // wildfire-error
    header("X-Wf-Protocol-1: http://meta.wildfirehq.org/Protocol/JsonStream/0.2");
    header("X-Wf-1-Plugin-1: http://meta.firephp.org/Wildfire/Plugin/FirePHP/Library-FirePHPCore/0.3");
    header("X-Wf-1-Structure-1: http://meta.firephp.org/Wildfire/Structure/FirePHP/FirebugConsole/0.1");
    $wildfire = json_encode(array(array("Type" => "ERROR"), $error));
    header("X-Wf-1-1-1-1: " . strlen($wildfire) . "|{$wildfire}|");
    // css-error
    $content = preg_replace_callback("/[^a-zA-Z0-9]/Su", function ($matches) {
        $char = $matches[0];
        if (!isset($char[1])) {
            $hex = ltrim(strtoupper(bin2hex($char)), "0");
            return "\\" . (strlen($hex) ? $hex : "0") . " ";
        }
        $char = mb_convert_encoding($char, "UTF-16BE", "UTF-8");
        return "\\" . ltrim(strtoupper(bin2hex($char)), "0") . " ";
    }, $error);
    echo "/* $error */\n";
    echo "body:before {\n";
    echo "    content:{$content}\n";
    echo "    position:absolute;\n";
    echo "    top:5px;\n";
    echo "    left:5px;\n";
    echo "    right:5px;\n";
    echo "    z-index:9999;\n";
    echo "    border:1px solid;\n";
    echo "    background:snow;\n";
    echo "    border-radius:5px;\n";
    echo "    color:red;\n";
    echo "    padding:15px;\n";
    echo "};\n";
}