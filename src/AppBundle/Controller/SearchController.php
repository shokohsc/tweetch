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
        $limit = 10;
        $offset = ($page * $limit) - $limit;
        $params = array(
          'q' => $query,
          'limit' => $limit,
          'offset' => $offset,
        );
        $search = $this->get('search.repository')->getChannels($params);
        $search = $this->get('json.serializer')->encode($search);
        $json = json_decode($search);

        return new JsonResponse(['q' => $query, 'entity' => 'channels', 'results' => $json], 200);
    }

    /**
     * @Route("/games/{query}/{page}", name="games_search", defaults={"page" = 1}, requirements={"page" = "\d+"})
     */
    public function gamesAction($query, $page = 1)
    {
        $limit = 10;
        $offset = ($page * $limit) - $limit;
        $params = array(
          'q' => $query,
          'limit' => $limit,
          'offset' => $offset,
          'type' => 'suggest',
          'live' => true,
        );
        $search = $this->get('search.repository')->getGames($params);
        $search = $this->get('json.serializer')->encode($search);
        $json = json_decode($search);

        return new JsonResponse(['q' => $query, 'entity' => 'games', 'results' => $json], 200);
    }

    /**
     * @Route("/streams/{query}/{page}", name="streams_search", defaults={"page" = 1}, requirements={"page" = "\d+"})
     */
    public function streamsAction($query, $page = 1)
    {
        $limit = 10;
        $offset = ($page * $limit) - $limit;
        $params = array(
          'q' => $query,
          'limit' => $limit,
          'offset' => $offset,
          // 'hls' => true,
        );
        $search = $this->get('search.repository')->getStreams($params);
        $search = $this->get('json.serializer')->encode($search);
        $json = json_decode($search);

        return new JsonResponse(['q' => $query, 'entity' => 'streams', 'results' => $json], 200);
    }
}
