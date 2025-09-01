<?php

namespace App\Entity;

use App\Repository\AlumnoRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AlumnoRepository::class)]
class Alumno
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column]
    private ?int $nro_alumno = null;

    #[ORM\Column(nullable: true)]
    private ?int $programa = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getNroAlumno(): ?int
    {
        return $this->nro_alumno;
    }

    public function setNroAlumno(int $nro_alumno): static
    {
        $this->nro_alumno = $nro_alumno;

        return $this;
    }

    public function getPrograma(): ?int
    {
        return $this->programa;
    }

    public function setPrograma(?int $programa): static
    {
        $this->programa = $programa;

        return $this;
    }
}
