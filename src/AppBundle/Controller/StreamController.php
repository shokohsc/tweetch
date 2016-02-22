<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * @Route("/api/streams")
 */
class StreamController extends Controller
{
    /**
     * @Route("/game/{gameId}/{page}", name="game_streams", defaults={"page" = 1}, requirements={"page" = "\d+"}, options={"expose"=true})
     */
    public function gameAction($gameId, $page = 1)
    {
        $limit = 10;
        $offset = $limit * $page;
        $params = array(
          'game' => $gameId,
          'limit' => $limit,
          'offset' => $offset,
          'stream_type' => 'live',
        );
        $stream = $this->get('stream.repository')->getStreams($params);
        $stream = $this->get('json.serializer')->encode($stream);
        $json = json_decode($stream);

        return new JsonResponse(['streams' => $json, 'title' => $gameId], 200);
    }
}
