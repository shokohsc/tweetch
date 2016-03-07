<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * @Route("/api/users")
 */
class UserController extends Controller
{
    /**
     * @Route("/{userId}/games/{page}", name="games_users", defaults={"page" = 1}, requirements={"page" = "\d+"})
     */
    public function gamesAction($userId, $page = 1)
    {
        $limit = 28;
        $offset = ($page * $limit) - $limit;
        $params = array(
          'limit' => $limit,
          'offset' => $offset,
        );
        $followedGames = $this->get('user.repository')->getUserFollowedGames($userId, $params);
        $followedGames = $this->get('json.serializer')->encode($followedGames);
        $json = json_decode($followedGames);

        return new JsonResponse(['follows' => $json, 'username' => $userId], 200);
    }
}
