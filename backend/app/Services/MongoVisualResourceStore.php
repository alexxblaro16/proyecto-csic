<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use MongoDB\Collection;
use MongoDB\Laravel\Connection;

class MongoVisualResourceStore
{
    public const COLLECTION = 'visual_resources';

    public function connection(): Connection
    {
        /** @var Connection $connection */
        $connection = DB::connection('mongodb');

        return $connection;
    }

    public function collection(): Collection
    {
        return $this->connection()->getCollection(self::COLLECTION);
    }

    public function databaseName(): string
    {
        return $this->connection()->getDatabaseName();
    }
}
