<?php
//composer dump-autoload
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
use Vsch\TranslationManager\Translator;


Route::group(['prefix' => \Mcamara\LaravelLocalization\Facades\LaravelLocalization::setLocale(), 'middleware' => [ 'localeSessionRedirect', 'localizationRedirect', 'localeViewPath' ]], function () {

    \Route::group(['middleware' => 'web', 'prefix' => 'translations'], function () {
        Translator::routes();
    });
    Route::get('/', function () {
        return view('welcome');
    });
    Route::group(['middleware' => ['auth']], function () {
        Route::resource('users', 'Users\UserController');
        Route::resource('posts', 'PostController');
        Route::resource('roles', 'Users\RoleController');
        Route::resource('permissions', 'Users\PermissionController');

        Route::delete('permissions', 'Users\PermissionController@actionsDestroy')->name('permissions.actions.destroy');
        Route::delete('roles', 'Users\RoleController@actionsDestroy')->name('roles.actions.destroy');
        Route::delete('users', 'Users\UserController@actionsDestroy')->name('users.actions.destroy');

//    Route::group(['middleware' => ['permission:users__roles--update']], function () {
        Route::patch('users/{user}/roles/update', 'Users\UserController@rolesUpdate')->name('users.roles.update');
        Route::get('users/{user}/roles', 'Users\UserController@roles')->name('users.roles');
//    });
//    Route::group(['middleware' => ['permission:roles__permissions--update']], function () {
        Route::patch('roles/{role}/permissions/update', 'Users\RoleController@permissionsUpdate')->name('roles.permissions.update');
        Route::get('roles/{role}/permissions', 'Users\RoleController@permissions')->name('roles.permissions');
//    });

    });
    Auth::routes();
    Route::get('/test', function (){
        return view('test');
    })->name('test');

    Route::get('/admin', 'HomeController@index')->name('home');
});
