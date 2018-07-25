<?php

use App\Models\Users\Role;
use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach(range(1, 200) as $index){
            Role::create([
                'name' => 'role'.$index,
                'display_name' => 'Role'.$index,
                'description' => 'description'
            ]);
        }

    }
}
