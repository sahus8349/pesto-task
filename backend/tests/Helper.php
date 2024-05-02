<?php

namespace Tests;

use Illuminate\Testing\TestResponse;
use Laravel\Passport\Passport;
use App\Models\User;
use DB;

trait Helper
{
    protected function createPersonalClient()
    {
        Passport::$hashesClientSecrets = false;

        $this->artisan(
            'passport:client',
            ['--name' => config('app.name'), '--personal' => null]
        );

        // use the query builder instead of the model, to retrieve the client secret
        return DB::table('oauth_clients')
            ->where('personal_access_client','=',true)
            ->first();
    }

    protected function ganrateToken()
    {
        $this->createPersonalClient();
        $user = User::factory()->create();
        return $user->createToken('task')->accessToken;
    }

    protected function getHeadres()
    {
        return ['Accept' => 'application/json','Authorization' =>'Bearer '.$this->ganrateToken()];
    }
}
