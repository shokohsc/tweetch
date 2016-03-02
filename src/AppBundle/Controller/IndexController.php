<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class IndexController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction()
    {
        $clientId = $this->getParameter('client_id');

        return $this->render('base.html.twig', array(
          'client_id' => $clientId,
        ));
    }
}
