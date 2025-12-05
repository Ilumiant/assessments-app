<?php

namespace Database\Seeders;

use App\Models\Manager;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ManagerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Manager::create(['name' => 'Manager One', 'email' => 'manager1@example.com']);
        Manager::create(['name' => 'Manager Two', 'email' => 'manager2@example.com']);
        Manager::create(['name' => 'Manager Three', 'email' => 'manager3@example.com']);
    }
}
