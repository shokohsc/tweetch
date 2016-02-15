<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class ApiController extends Controller
{
    /**
     * @Route("/")
     */
    public function indexAction()
    {
        return new JsonResponse([], 200);
    }

    /**
     * @Route("/login")
     */
    public function loginAction()
    {
        return new JsonResponse([], 200);
    }

    /**
     * @Route("/logout")
     */
    public function logoutAction()
    {
        return new JsonResponse([], 200);
    }

    /**
     * @Route("/games")
     */
    public function gamesAction()
    {
        return new JsonResponse([], 200);
    }

}
