<?php

namespace AppBundle\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class StreamControllerTest extends WebTestCase
{
    public function testGames()
    {
        $client = static::createClient();

        $client->request('GET', '/api/streams/game/Brawlhalla');
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }

    public function testFeatured()
    {
        $client = static::createClient();

        $client->request('GET', '/api/streams/featured');
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }

    public function testGet()
    {
        $client = static::createClient();

        $client->request('GET', '/api/streams/test_channel');
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }
}
