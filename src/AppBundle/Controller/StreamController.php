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
     * @Route("/game/{gameId}/{page}", name="games_streams", defaults={"page" = 1}, requirements={"page" = "\d+"})
     */
    public function gamesAction($gameId, $page = 1)
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

    /**
     * @Route("/{streamId}", name="stream")
     */
    public function getAction($streamId)
    {
        $stream = $this->get('stream.repository')->getStream($streamId);
        $stream = $this->get('json.serializer')->encode($stream);
        $json = json_decode($stream);

        return new JsonResponse($json, 200);
    }
}
