<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('mongo:check', function () {
    $connection = DB::connection('mongodb');
    $databaseName = $connection->getDatabaseName();
    $smokeCollection = '__smoke_tests';
    $smokeId = (string) str()->uuid();
    $timestamp = now()->toIso8601String();

    $this->info('Checking MongoDB connection...');
    $this->line("Database: {$databaseName}");

    $pingResult = $connection->getDatabase()->command(['ping' => 1])->toArray();
    $pingOk = (int) ($pingResult[0]->ok ?? 0) === 1;

    if (! $pingOk) {
        $this->error('MongoDB ping failed.');

        return self::FAILURE;
    }

    $collection = $connection->getCollection($smokeCollection);

    $collection->insertOne([
        '_id' => $smokeId,
        'type' => 'mongo_smoke_test',
        'created_at' => $timestamp,
    ]);

    $document = $collection->findOne(['_id' => $smokeId]);
    $collection->deleteOne(['_id' => $smokeId]);

    if ($document === null) {
        $this->error("Smoke test document was not found in {$smokeCollection}.");

        return self::FAILURE;
    }

    $this->info('MongoDB connection is ready.');
    $this->line("Smoke collection: {$smokeCollection}");
    $this->line("Inserted and removed test document: {$smokeId}");

    return self::SUCCESS;
})->purpose('Verify the MongoDB connection used for visual resources.');
