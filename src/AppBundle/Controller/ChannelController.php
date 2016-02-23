<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * @Route("/api/channels")
 */
class ChannelController extends Controller
{
    /**
     * @Route("/{channelId}", name="channel")
     */
    public function getAction($channelId)
    {
        $channel = $this->get('channel.repository')->getChannel($channelId);
        $channel = $this->get('json.serializer')->encode($channel);
        $json = json_decode($channel);

        return new JsonResponse($json, 200);
    }
}
