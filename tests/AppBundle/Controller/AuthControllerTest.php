<?php

namespace AppBundle\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class AuthControllerTest extends WebTestCase
{
    public function testMe()
    {
        $client = static::createClient();

        $client->request('GET', '/api/auth/me');
        $this->assertEquals(400, $client->getResponse()->getStatusCode());
    }
}
