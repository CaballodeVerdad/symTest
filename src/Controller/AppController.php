<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AppController extends AbstractController
{
    #[Route('/', name: 'app_index')]
    public function appIndex(): Response
    {
        $contents = $this->render('app/appIndex.html.twig');
		return $contents;
		// echo "Testing!";
		// return new Response("<h1>Testing!</h1>");
    }
}