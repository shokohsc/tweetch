<?php

namespace AppBundle\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class UserControllerTest extends WebTestCase
{
    public function testTop()
    {
        $client = static::createClient();

        $client->request('GET', '/api/users/test_user/games');
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }
}
