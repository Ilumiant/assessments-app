<?php

namespace Tests;

trait SkipsIfNoSqlite
{
    protected function skipIfNoSqlite(): void
    {
        if (! extension_loaded('pdo_sqlite')) {
            $this->markTestSkipped('Skipping: pdo_sqlite extension is not enabled.');
        }
    }
}
