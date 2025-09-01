<?php

namespace App\Entity;

use App\Repository\ExamenRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ExamenRepository::class)]
class Examen
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $ano = null;

    #[ORM\Column]
    private ?int $periodo = null;

    #[ORM\Column]
    private ?int $mes = null;

    #[ORM\Column(length: 128)]
    private ?string $nombre_legible = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAno(): ?int
    {
        return $this->ano;
    }

    public function setAno(int $ano): static
    {
        $this->ano = $ano;

        return $this;
    }

    public function getPeriodo(): ?int
    {
        return $this->periodo;
    }

    public function setPeriodo(int $periodo): static
    {
        $this->periodo = $periodo;

        return $this;
    }

    public function getMes(): ?int
    {
        return $this->mes;
    }

    public function setMes(int $mes): static
    {
        $this->mes = $mes;

        return $this;
    }

    public function getNombreLegible(): ?string
    {
        return $this->nombre_legible;
    }

    public function setNombreLegible(string $nombre_legible): static
    {
        $this->nombre_legible = $nombre_legible;

        return $this;
    }
}
