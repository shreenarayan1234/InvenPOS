<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            'name' => 'Admin',
            'email' => 'admin@invenpos.com',
            'phone' => '9861619561',
            'password' => Hash::make('12345678'),
            'role_id' => '1',
        ];
        User::create($data);
    }
}
