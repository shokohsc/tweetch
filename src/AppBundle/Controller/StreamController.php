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
     * @Route("", name="streams", options={"expose"=true})
     */
    public function listAction(Request $request)
    {
        $streams = $this->get('stream.repository')->getStreams($request->query->all());
        $streams = $this->get('json.serializer')->encode($streams);
        $json = json_decode($streams);

        return new JsonResponse($json, 200);
    }

    /**
     * @Route("/{streamId}", name="stream", options={"expose"=true})
     */
    public function getAction($streamId)
    {
        $stream = $this->get('stream.repository')->getStream($streamId);
        $stream = $this->get('json.serializer')->encode($stream);
        $json = json_decode($stream);

        return new JsonResponse($json, 200);
    }
}
