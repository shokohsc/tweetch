<?php

namespace AppBundle\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class GameControllerTest extends WebTestCase
{
    public function testTop()
    {
        $client = static::createClient();

        $client->request('GET', '/api/games/top');
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }
}
