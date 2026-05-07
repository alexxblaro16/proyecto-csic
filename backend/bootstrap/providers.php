<?php

use App\Providers\AppServiceProvider;
use MongoDB\Laravel\ServiceProvider as MongoDBServiceProvider;

return [
    AppServiceProvider::class,
    MongoDBServiceProvider::class,
];
