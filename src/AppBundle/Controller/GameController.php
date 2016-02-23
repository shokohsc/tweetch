<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * @Route("/api/games")
 */
class GameController extends Controller
{
    /**
     * @Route("/top/{page}", name="games_top", defaults={"page" = 1}, requirements={"page" = "\d+"})
     */
    public function topAction($page = 1)
    {
        $limit = 28;
        $offset = $limit * $page;
        $params = array(
          'limit' => $limit,
          'offset' => $offset,
        );
        $top = $this->get('game.repository')->getTop($params);
        $top = $this->get('json.serializer')->encode($top);
        $json = json_decode($top);

        return new JsonResponse($json, 200);
    }
}
