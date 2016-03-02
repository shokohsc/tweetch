<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * @Route("/api")
 */
class ApiController extends Controller
{
    /**
     * @Route("/login", name="login")
     */
    public function loginAction(Request $request)
    {
        $accessToken = $request->headers->get('authorization');
        if ($accessToken && !empty($accessToken)) {
            $me = $this->get('me.repository')->getMe($accessToken);
            $me = $this->get('json.serializer')->encode($me);
            $json = json_decode($me);

            return new JsonResponse($json, 200);
        }

        return new JsonResponse(['error' => 'wrong access token'], 400);
    }

    /**
     * @Route("/logout", name="logout")
     */
    public function logoutAction()
    {
        return new JsonResponse([], 204);
    }
}
