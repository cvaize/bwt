<?php

use App\Models\Users\User;
use Illuminate\Database\Seeder;
use Faker\Factory;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $faker = Factory::create('ru_RU');
//        foreach(range(1, 150) as $index){
//            User::create([
//                'f_name' => $faker->firstNameMale,
//                'l_name' => $faker->lastName,
//                'phone' => $faker->phoneNumber,
//                'email' => $faker->email.$index,
//                'sex' => 'male',
//                'password' => $faker->password,
//            ]);
//        }
//        foreach(range(1, 150) as $index){
//            User::create([
//                'f_name' => $faker->firstNameFemale,
//                'l_name' => $faker->lastName,
//                'phone' => $faker->phoneNumber,
//                'email' => $faker->email.$index,
//                'sex' => 'female',
//                'password' => $faker->password,
//            ]);
//        }
        User::create([
            'f_name' => 'Менеджер',
            'l_name' => 'Олег',
            'phone' => $faker->phoneNumber,
            'email' => 'manager@gmail.com',
            'sex' => 'male',
            'password' => '12345678',
        ]);
        User::create([
            'f_name' => 'Переводчик',
            'l_name' => 'Дмитрий',
            'phone' => $faker->phoneNumber,
            'email' => 'translator@gmail.com',
            'sex' => 'male',
            'password' => '12345678',
        ]);
    }
}
