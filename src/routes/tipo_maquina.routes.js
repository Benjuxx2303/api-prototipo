import { Router } from "express";
import {getTipos_maquinas, getTipo_maquina, createTipo_maquina, deleteTipo_maquina, updateTipo_maquina} from '../controllers/tipo_maquina.controllers.js'

const router = Router();

router.get("/tipo_maquina", getTipos_maquinas);

router.get("/tipo_maquina/:id", getTipo_maquina);

router.post("/tipo_maquina", createTipo_maquina);

router.delete("/tipo_maquina/:id", deleteTipo_maquina);

router.put("/tipo_maquina/:id", updateTipo_maquina);

export default router;