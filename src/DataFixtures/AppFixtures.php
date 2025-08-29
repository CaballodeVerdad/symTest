<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Producto;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $product = new Producto();
		$product->setName('Producto de ejemplo');
		$product->setDescripcion('Descripción del producto de ejemplo');
		$product->setSize(42);
		$product->setPrecio(19);
		$manager->persist($product);

		$product = new Producto();
		$product->setName('Otro Producto');
		$product->setDescripcion('Descripción del otro producto');
		$product->setSize(38);
		$product->setPrecio(29);
		$manager->persist($product);

		//actually load them to the DB
        $manager->flush();
		// para guardar los cambios CON RESETEO DE TABLAS, ejecutar "php bin/console doctrine:fixtures:load" en la terminal.
		// para guardar los cambios SIN RESETEO DE TABLAS, ejecutar "php bin/console doctrine:fixtures:load --append" en la terminal.
    }
}
