<?php

use App\Models\User;

test('guests are redirected to the login page', function () {
    $this->get(route('dashboard'))->assertRedirect(route('login'));
});

test('authenticated users hitting dashboard are redirected to assessments', function () {
    $this->actingAs($user = User::factory()->create());

    $this->get(route('dashboard'))->assertRedirect(route('assessments.index'));
});