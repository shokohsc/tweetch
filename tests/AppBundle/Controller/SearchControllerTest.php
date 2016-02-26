<?php

namespace AppBundle\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class SearchControllerTest extends WebTestCase
{
    public function testChannels()
    {
        $client = static::createClient();

        $client->request('GET', '/api/search/channels/test_channel');
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }

    public function testGames()
    {
        $client = static::createClient();

        $client->request('GET', '/api/search/games/metal gear');
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }

    public function testStreams()
    {
        $client = static::createClient();

        $client->request('GET', '/api/search/streams/test_channel');
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }
}
