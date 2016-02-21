<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * @Route("/api")
 */
class ApiController extends Controller
{
    /**
     * @Route("/login", name="login")
     */
    public function loginAction()
    {
        return new JsonResponse([], 200);
    }

    /**
     * @Route("/logout", name="logout")
     */
    public function logoutAction()
    {
        return new JsonResponse([], 200);
    }
}
