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
        // dump($request->headers);
        return new JsonResponse([], 200);
    }

    /**
     * @Route("/logout", name="logout")
     */
    public function logoutAction()
    {
        return new JsonResponse([], 204);
    }
}
