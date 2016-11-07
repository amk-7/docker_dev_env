<?php

namespace MercurySeries\Helpers;

use ReflectionClass;
use View;
use Illuminate\Support\ServiceProvider;

class HelpersServiceProvider extends ServiceProvider
{
    /**
     * Indicates if loading of the provider is deferred.
     *
     * @var bool
     */
    protected $defer = false;

    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->publishes([
            __DIR__ . '/../config/helpers.php' => config_path('helpers.php'),
        ], 'config');

        $this->loadHelpersFrom(config('helpers.helpers_path'));
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->mergeConfigFrom(__DIR__ . '/../config/helpers.php', 'helpers');
    }

    public static function loadHelpersFrom($directory)
    {
        $helpers = static::findAllHelpersIn($directory);

        foreach ($helpers as $helper) {
            static::registerMethods($helper);
        }
    }

    public static function findAllHelpersIn($directory)
    {
        return array_diff(scandir($directory), array('..', '.'));
    }

    public static function registerMethods($helper)
    {
        $helperClassFQN = static::buildClassFQN($helper);

        $reflector = new Reflection($helperClassFQN);

        $methods = $reflector->getMethods();

        foreach ($methods as $method) {
            $methodHelper = function(...$params) use ($method) {
                $method->class::{$method->name}(...$params);
            };

            View::share($method->name, $methodHelper);
        }
    }

    public static function buildClassFQN($helper)
    {
        $helperClassName = substr($helper, 0, -4);
        return config('helpers.helpers_base_namespace') . $helperClassName;
    }
}