<?php

use App\Models\Users\Permission;
use Illuminate\Database\Seeder;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach(range(1, 50) as $index){
            (new Permission)->createCrud('permission'.$index, 'Permission'.$index);
        }
    }
}
