<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * @Route("/api/streams")
 */
class StreamController extends Controller
{
    /**
     * @Route("/{streamId}", name="stream", requirements={"streamId" = "\d+"}, options={"expose"=true})
     */
    public function getAction($streamId)
    {
        $stream = $this->get('stream.repository')->getStream($streamId);
        $stream = $this->get('json.serializer')->encode($stream);
        $json = json_decode($stream);

        return new JsonResponse($json, 200);
    }
}
