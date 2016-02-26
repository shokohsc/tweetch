<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * @Route("/api/search")
 */
class SearchController extends Controller
{
    /**
     * @Route("/channels/{query}/{page}", name="channels_search", defaults={"page" = 1}, requirements={"page" = "\d+"})
     */
    public function channelsAction($query, $page = 1)
    {
        $limit = 9;
        $offset = ($page * $limit) - $limit;
        $params = array(
          'q' => $query,
          'limit' => $limit,
          'offset' => $offset,
        );
        $result = $this->get('search.repository')->getChannels($params);
        $result = $this->get('json.serializer')->encode($result);
        $json = json_decode($result);

        return new JsonResponse(['q' => $query, 'entity' => 'channels', 'results' => $json], 200);
    }

    /**
     * @Route("/games/{query}", name="games_search")
     */
    public function gamesAction($query)
    {
        $params = array(
          'q' => $query,
          'type' => 'suggest',
          'live' => true,
        );
        $result = $this->get('search.repository')->getGames($params);
        $result = $this->get('json.serializer')->encode($result);
        $json = json_decode($result);

        return new JsonResponse(['q' => $query, 'entity' => 'games', 'results' => $json], 200);
    }

    /**
     * @Route("/streams/{query}/{page}", name="streams_search", defaults={"page" = 1}, requirements={"page" = "\d+"})
     */
    public function streamsAction($query, $page = 1)
    {
        $limit = 9;
        $offset = ($page * $limit) - $limit;
        $params = array(
          'q' => $query,
          'limit' => $limit,
          'offset' => $offset,
          // 'hls' => true,
        );
        $result = $this->get('search.repository')->getStreams($params);
        $result = $this->get('json.serializer')->encode($result);
        $json = json_decode($result);

        return new JsonResponse(['q' => $query, 'entity' => 'streams', 'results' => $json], 200);
    }
}
