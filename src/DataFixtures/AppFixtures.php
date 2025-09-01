<?php

namespace App\DataFixtures;

use App\Entity\Inscripciones;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Producto;
use App\Entity\Examen;
use App\Entity\Alumno;

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

		// add examen
		$examen = new Examen();
		$examen->setAno(2026);
		$examen->setMes(12);
		$examen->setPeriodo('1');
		$examen->setNombreLegible('Examen Final de Matemáticas 2026');
		$manager->persist($examen);

		// add alumno
		$alumno = new Alumno();
		$alumno->setName('Juan Pérez');
		$alumno->setNroAlumno(123456);
		$alumno->setPrograma(40023);
		$manager->persist($alumno);

		// add inscripcion
		$inscripcion = new Inscripciones();
		$inscripcion->setIdAlumno(1);
		$inscripcion->setIdExamen(1);
		$manager->persist($inscripcion);

		//actually load them to the DB
        $manager->flush();
		// para guardar los cambios CON RESETEO DE TABLAS, ejecutar "php bin/console doctrine:fixtures:load" en la terminal.
		// para guardar los cambios SIN RESETEO DE TABLAS, ejecutar "php bin/console doctrine:fixtures:load --append" en la terminal.
    }
}
