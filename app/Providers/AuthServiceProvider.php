<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
        Gate::define('ltm-admin-translations', function ($user) {
            return $user && $user->is_admin;
        });

        Gate::define('ltm-bypass-lottery', function ($user) {
            return $user && ($user->is_admin || $user->is_editor);
        });

        Gate::define(/**
         * @param $user
         * @param $connection_name
         * @param $user_list
         * @return \Illuminate\Support\Collection
         */
            'ltm-list-editors', function ($user, $connection_name, &$user_list) {
            $query = $user->on($connection_name)->getQuery();

            // modify the query to return only users that can edit translations and can be managed by $user
            // if you have a an editor scope defined on your user model you can use it to filter only translation editors
            //$user_list = $user->scopeEditors($query)->orderby('id')->get(['id', 'email', 'name']);
            $user_list = $query->orderby('id')->get(['id', 'email']);

            // if the returned list is empty then no per locale admin will be shown for the current user.
            return $user_list;
        });
    }
}
