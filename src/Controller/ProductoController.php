<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Repository\ProductoRepository;
use App\Entity\Producto;
use App\Form\ProductoType;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;

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
		// if (!$product) {
		// 	throw $this->createNotFoundException('El producto con id ' . $id . ' no existe');
		// }
		// return $this->render('producto/show.html.twig', [
		// 	'product' => $product,
		// ]);
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
	// Se agrega el objeto Request como argumento para cuando se envía el "save"
	public function new(Request $request, EntityManagerInterface $manager): Response
	{
		$product = new Producto(); // por si se creará uno nuevo
		// Crear form desde symTest\src\Form\ProductoType.php
		$form = $this->createForm(ProductoType::class, $product);


		// Como form no tiene action, se envía a la misma URL
		// Por defecto, el método es POST
		// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
		// 		// ...
		// }
		// Pero en symfony la data viene en un objeto Request

		$form->handleRequest($request);

		// El isValid usa los Assert del entity (Producto.php)
		// form está integrado con el validator
		if ($form->isSubmitted()){
			echo $form->isValid();
		}
		if ($form->isSubmitted() && $form->isValid()) {
			// Obtener los datos del form como un objeto Producto
			// $form->getData(); // Lo trae como objeto entity
			$aData = $request->request->all(); // Lo trae como array
			$manager->persist($product);
			$manager->flush();
			// usa la sessión para guardar mensajes entre requests
			$this->addFlash('notice', 'Producto creado con éxito!');
			return $this->redirectToRoute(
				'producto_mostrar',
				['id' => $product->getId()]
			);
		}

		return $this->render('producto/new.html.twig', [
			'form' => $form,
			// 'form' => $form->createView(),
		]);
	}
}

