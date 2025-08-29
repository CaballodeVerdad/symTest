<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Repository\ProductoRepository;

final class ProductoController extends AbstractController
{
    #[Route('/productos', name: 'producto_index')]
    // Asegurarse de agregar el repository como argumento del método
	public function index(ProductoRepository $productoRepository): Response
    {
		// retreive products from the database if needed
		$products = $productoRepository->findAll();
		
		// dd($products); // dump and die

		echo '<pre><h1>Lista de Productos</h1>';
		// print_r($products); // print and continue
		echo '</pre>';

        return $this->render('producto/index.html.twig', [
            'controller_name' => 'ProductoController',
			'products' => $products,
        ]);
    }
}
