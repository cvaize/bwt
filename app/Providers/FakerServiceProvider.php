<?php
/*
 * This file is part of the faker article.
 *
 * (c) Vincent Klaiber <hello@vinkla.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 * https://medium.com/laravel-news/fake-localized-data-and-laravel-c4cdbecb2c31
 */

//declare(strict_types=1);

namespace App\Providers;
use Faker\Factory;
use Faker\Generator;
use Illuminate\Support\ServiceProvider;
/**
 * This is the faker service provider class.
 *
 * @author Vincent Klaiber <hello@vinkla.com>
 */
class FakerServiceProvider extends ServiceProvider
{
    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        $this->registerFaker();
    }
    /**
     * Register the faker generator class.
     *
     * @return void
     */
    protected function registerFaker()
    {
        $this->app->singleton(Generator::class, function () {
            return Factory::create('ru_RU');
        });
    }
}