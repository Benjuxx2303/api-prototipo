import { Router } from "express";
import { getSalas_ordena, getSala_ordena, createSala_ordena, deleteSala_ordena, updateSala_ordena } from '../controllers/sala_ordena.controllers.js';

const router = Router();

router.get("/sala_ordena", getSalas_ordena);

router.get("/sala_ordena/:id", getSala_ordena);

router.post("/sala_ordena", createSala_ordena);

router.delete("/sala_ordena/:id", deleteSala_ordena);

router.put("/sala_ordena/:id", updateSala_ordena);

export default router;