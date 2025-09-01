<?php

namespace App\Controller;

use App\Entity\Inscripciones;
use App\Form\InscripcionesType;
use App\Repository\InscripcionesRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/inscripciones')]
final class InscripcionesController extends AbstractController
{
    #[Route(name: 'app_inscripciones_index', methods: ['GET'])]
    public function index(InscripcionesRepository $inscripcionesRepository): Response
    {
		// dd($inscripcionesRepository->findAll());
        return $this->render('inscripciones/index.html.twig', [
            'inscripciones' => $inscripcionesRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_inscripciones_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $inscripcione = new Inscripciones();
        $form = $this->createForm(InscripcionesType::class, $inscripcione);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($inscripcione);
            $entityManager->flush();

            return $this->redirectToRoute('app_inscripciones_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('inscripciones/new.html.twig', [
            'inscripcione' => $inscripcione,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_inscripciones_show', methods: ['GET'])]
    public function show(Inscripciones $inscripcione): Response
    {
        return $this->render('inscripciones/show.html.twig', [
            'inscripcione' => $inscripcione,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_inscripciones_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Inscripciones $inscripcione, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(InscripcionesType::class, $inscripcione);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_inscripciones_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('inscripciones/edit.html.twig', [
            'inscripcione' => $inscripcione,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_inscripciones_delete', methods: ['POST'])]
    public function delete(Request $request, Inscripciones $inscripcione, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$inscripcione->getId(), $request->getPayload()->getString('_token'))) {
            $entityManager->remove($inscripcione);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_inscripciones_index', [], Response::HTTP_SEE_OTHER);
    }
}
