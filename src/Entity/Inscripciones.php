<?php

namespace App\Entity;

use App\Repository\InscripcionesRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: InscripcionesRepository::class)]
class Inscripciones
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $id_alumno = null;

    #[ORM\Column]
    private ?int $id_examen = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIdAlumno(): ?int
    {
        return $this->id_alumno;
    }

    public function setIdAlumno(int $id_alumno): static
    {
        $this->id_alumno = $id_alumno;

        return $this;
    }

    public function getIdExamen(): ?int
    {
        return $this->id_examen;
    }

    public function setIdExamen(int $id_examen): static
    {
        $this->id_examen = $id_examen;

        return $this;
    }
}
