import express from "express";
import { prisma } from "../server.js";

const router = express.Router();

// Listar todos os exoplanetas
router.get("/", async (req, res) => {
  try {
    const exoplanets = await prisma.exoplanet.findMany({
      include: { images: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(exoplanets);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar exoplanetas" });
  }
});

// Buscar exoplaneta por ID
router.get("/:id", async (req, res) => {
  try {
    const exoplanet = await prisma.exoplanet.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { images: true },
    });

    if (!exoplanet) {
      return res.status(404).json({ error: "Exoplaneta não encontrado" });
    }

    res.json(exoplanet);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar exoplaneta" });
  }
});

// Criar novo exoplaneta
router.post("/", async (req, res) => {
  try {
    const { images, discoveryDate, ...planetData } = req.body;

    const exoplanet = await prisma.exoplanet.create({
      data: {
        ...planetData,
        discoveryDate: discoveryDate ? new Date(discoveryDate) : null,
        images: {
          create: images?.map((url) => ({ url })) || [],
        },
      },
      include: { images: true },
    });

    res.status(201).json(exoplanet);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar exoplaneta" });
  }
});

// Atualizar exoplaneta
router.put("/:id", async (req, res) => {
  try {
    const { images, discoveryDate, ...planetData } = req.body;

    const exoplanet = await prisma.exoplanet.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...planetData,
        discoveryDate: discoveryDate ? new Date(discoveryDate) : null,
      },
      include: { images: true },
    });

    res.json(exoplanet);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar exoplaneta" });
  }
});

// Deletar exoplaneta
router.delete("/:id", async (req, res) => {
  try {
    await prisma.exoplanet.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: "Exoplaneta deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar exoplaneta" });
  }
});

export default router;
