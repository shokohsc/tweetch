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
        $gameId = urldecode($gameId);
        $limit = 9;
        $offset = ($page * $limit) - $limit;
        $params = array(
          'game' => $gameId,
          'limit' => $limit,
          'offset' => $offset,
          'stream_type' => 'live',
        );
        $streams = $this->get('stream.repository')->getStreams($params);
        $streams = $this->get('json.serializer')->encode($streams);
        $json = json_decode($streams);

        return new JsonResponse(['streams' => $json, 'title' => $gameId], 200);
    }

    /**
     * @Route("/featured/{page}", name="featured_streams", defaults={"page" = 1}, requirements={"page" = "\d+"})
     */
    public function featuredAction($page = 1)
    {
        $limit = 25;
        $offset = ($page * $limit) - $limit;
        $params = array(
          'limit' => $limit,
          'offset' => $offset,
        );
        $featuredStreams = $this->get('stream.repository')->getFeaturedStreams($params);
        $featuredStreams = $this->get('json.serializer')->encode($featuredStreams);
        $json = json_decode($featuredStreams);

        return new JsonResponse($json, 200);
    }

    /**
     * @Route("/followed/{page}", name="streams_followed", defaults={"page" = 1}, requirements={"page" = "\d+"})
     */
    public function followedAction(Request $request, $page = 1)
    {
        $accessToken = $request->headers->get('authorization');
        if ($accessToken && !empty($accessToken)) {
            $limit = 9;
            $offset = ($page * $limit) - $limit;
            $params = array(
              'limit' => $limit,
              'offset' => $offset,
              'stream_type' => 'live',
            );
            $accessToken = base64_decode($accessToken);
            $followedStreams = $this->get('stream.repository')->getFollowedStreams($accessToken, $params);
            $followedStreams = $this->get('json.serializer')->encode($followedStreams);
            $json = json_decode($followedStreams);

            return new JsonResponse($json, 200);
        }

        return new JsonResponse(['error' => 'wrong access token'], 400);
    }

    /**
     * @Route("/{channelId}", name="get_streams")
     */
    public function getAction($channelId)
    {
        $stream = $this->get('stream.repository')->getStream($channelId);
        $stream = $this->get('json.serializer')->encode($stream);
        $json = json_decode($stream);

        return new JsonResponse($json, 200);
    }
}
