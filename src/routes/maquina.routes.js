import { Router } from "express";
import { getMaquinas, getMaquina, createMaquina, deleteMaquina, updateMaquina } from '../controllers/maquina.controllers.js';

const router = Router();

router.get("/maquina", getMaquinas);

router.get("/maquina/:id", getMaquina);

router.post("/maquina", createMaquina);

router.delete("/maquina/:id", deleteMaquina);

router.put("/maquina/:id", updateMaquina);

export default router;