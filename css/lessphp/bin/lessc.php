#!/usr/bin/env php
<?php
if (php_sapi_name() != "cli")
    exit;

require_once dirname(__FILE__) . '/../lib/Less.php';

// Create our environment
$env = array('compress' => false);
$silent = false;
$watch = false;
$rootpath = '';

// Check for arguments
array_shift($argv);
if (!count($argv)) {
    $argv[] = '-h';
}

// parse arguments
foreach ($argv as $key => $arg) {
    if (preg_match('/^--?([a-z][0-9a-z-]*)(?:=([^\s]+))?$/i', $arg, $matches)) {
        $option = $matches[1];
        $value = isset($matches[2]) ? $matches[2] : false;
        unset($argv[$key]);

        switch ($option) {
            case 'h':
            case 'help':
                echo <<<EOD
Usage: lessc [options] sources [destination]

 -h, --help            Print help (this message) and exit.
 -s, --silent          Suppress output of error messages.
 -v, --version         Print version number and exit.
 -x, --compress        Compress output by removing some whitespaces.
 --include-path=PATHS  Set include paths. Separated by `:'. Use `;' on Windows.
 --strict-imports      Force evaluation of imports.
 -sm=on|off            Turn on or off strict math, where in strict mode, math
 --strict-math=on|off  requires brackets. This option may default to on and then
                       be removed in the future.
 -su=on|off            Allow mixed units, e.g. 1px+1em or 1px*1px which have units
 --strict-units=on|off that cannot be represented.
 -ru, --relative-urls  re-write relative urls to the base less file.
 -rp, --rootpath=URL   Set rootpath for url rewriting in relative imports and urls.
                       Works with or without the relative-urls option.
 -w, --watch           Watch input files for changes.


EOD;
                exit;
            case 's':
            case 'silent':
                $silent = true;
                break;

            case 'w':
            case 'watch':
                $watch = true;
                break;

            case 'v':
            case 'version':
                echo "lessc " . Less_Version::version . " (less.php)\n\n";
                exit;

            case 'rp':
            case 'rootpath':
                $rootpath = $value;
                break;


            //parser options
            case 'compress':
                $env['compress'] = true;
                break;

            case 'ru':
            case 'relative-urls':
                $env['relativeUrls'] = true;
                break;

            case 'su':
            case 'strict-units':
                $env['strictUnits'] = ($value === 'on');
                break;

            case 'sm':
            case 'strict-math':
                $env['strictMath'] = ($value === 'on');
                break;

            case 'x':
            case 'include-path':
                $env['import_dirs'] = preg_split('#;|\:#', $value);
                break;
        }
    }
}

if (count($argv) > 1) {
    $output = array_pop($argv);
    $inputs = $argv;
} else {
    $inputs = $argv;
    $output = false;
}

if (!count($inputs)) {
    echo("lessc: no input files\n");
    exit;
}

if ($watch) {
    if (!$output) {
        echo("lessc: you must specify the output file if --watch is given\n");
        exit;
    }

    $lastAction = 0;
    $lastImports = array();

    echo("lessc: watching input files\n");

    while (1) {
        clearstatcache();

        $updated = false;
        foreach ($inputs as $input) {
            if ($input == '-') {
                if (count($inputs) == 1) {
                    echo("lessc: during watching files is not possible to watch stdin\n");
                    exit;
                } else {
                    continue;
                }
            }

            if (filemtime($input) > $lastAction) {
                $updated = true;
                break;
            }
        }

        if (!$updated && $lastImports) {
            foreach ($lastImports as $dirname => $imports) {
                foreach ($imports as $input) {
                    if (filemtime($dirname . DIRECTORY_SEPARATOR . $input) > $lastAction) {
                        $updated = true;
                        break;
                    }
                }
                if ($updated) {
                    break;
                }
            }
        }

        if ($updated || !$lastImports) {
            $lastAction = time();
            $lastImports = array();
            $parser = new Less_Parser($env);
            foreach ($inputs as $input) {
                try {
                    $parser->parseFile($input, $rootpath);
                } catch (Exception $e) {
                    echo("lessc: " . $e->getMessage() . " \n");
                    continue; // Invalid processing
                }
            }

            try {
                file_put_contents($output, $parser->getCss());
            } catch (Exception $e) {
                echo("lessc: " . $e->getMessage() . " \n");
            }
            $lastImports[dirname($input)] = Less_Parser::AllParsedFiles();

            echo("lessc: output file recompilled\n");
        }

        sleep(1);
    }
} else {
    $parser = new Less_Parser($env);
    foreach ($inputs as $input) {
        if ($input == '-') {
            $content = file_get_contents('php://stdin');
            $parser->parse($content);
        } else {
            try {
                $parser->parseFile($input);
            } catch (Exception $e) {
                if (!$silent) {
                    echo("lessc: " . ((string) $e) . " \n");
                }
            }
        }
    }

    if ($output) {
        file_put_contents($output, $parser->getCss());
    } else {
        echo $parser->getCss();
    }
}
