<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Passport\PersonalAccessTokenResult;
use Laravel\Passport\PersonalAccessClient;
use Laravel\Passport\Passport;
use Tests\TestCase;
use Tests\Helper;
use App\Models\User;

class PersonalAccessClientTest extends TestCase
{
    use RefreshDatabase, Helper; // Use database migrations for testing

    /** @test */
    public function can_create_a_personal_access_client()
    {
        Passport::$hashesClientSecrets = false;

        $this->artisan(
            'passport:client', 
            ['--name' => config('app.name'), '--personal' => null]
        )->assertSuccessful();


        $this->assertDatabaseCount(PersonalAccessClient::class,1);
    }

    /** @test */
    public function can_issue_a_personal_access_token()
    {
        $this->createPersonalClient();

        $user = User::factory()->create()->createToken('test');
        
        $this->assertInstanceOf(PersonalAccessTokenResult::class, $user);

        $this->assertObjectHasProperty('accessToken', $user);
        
        $this->assertObjectHasProperty('token', $user);
    }
}
