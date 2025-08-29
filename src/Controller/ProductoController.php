<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Repository\ProductoRepository;
use App\Entity\Producto;
use App\Form\ProductoType;

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


	// DEPRECATED: la opcion siguiente es mejor
	// el <> es para restringir el tipo de parametro (aquí, solo números)
	#[Route('/producto_old/{id<\d+>}', name: 'producto_show')]
	public function show(int $id, ProductoRepository $productoRepository): Response
	{
		// Distintos metodos:
		//SOlo por id
		// $product = $productoRepository->find($id);
		//multiples columnas
		$product = $productoRepository->findOneBy(['id' => $id]);
		dd($product);
		if (!$product) {
			throw $this->createNotFoundException('El producto con id ' . $id . ' no existe');
		}
		return $this->render('producto/show.html.twig', [
			'product' => $product,
		]);
	}

	// opcion mejor
	// el <> es para restringir el tipo de parametro (aquí, solo números)
	#[Route('/producto/{id<\d+>}', name: 'producto_mostrar')]
	public function mostrar(Producto $producto): Response
	{
		// El parametro $producto es inyectado automaticamente por Symfony
		// Si no se encuentra, lanza una excepcion 404 automaticamente
		return $this->render('producto/show.html.twig', [
			'product' => $producto,
		]);
	}

	#[Route('/producto/nuevo', name: 'producto_nuevo')]
	public function new(): Response
	{
		$form = $this->createForm(ProductoType::class);
		return $this->render('producto/new.html.twig', [
			'form' => $form->createView(),
		]);
	}


}
