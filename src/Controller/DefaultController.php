<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    #[Route('/default', name: 'default_index')]
    public function index(): Response
    {
        // return $this->render('base.html.twig');
		// echo "Testing!";
		return new Response("<h1>Testing Default!</h1>");
    }
}