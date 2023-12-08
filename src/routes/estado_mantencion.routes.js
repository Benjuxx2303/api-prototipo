import { Router } from "express";
import {
  getEstados_mantenciones,
  getEstado_mantencion,
  createEstado_mantencion,
  deleteEstado_mantencion,
  updateEstado_mantencion,
} from "../controllers/estado_mantencion.controllers.js";

const router = Router();

router.get("/estado_mantencion", getEstados_mantenciones);

router.get("/estado_mantencion/:id", getEstado_mantencion);

router.post("/estado_mantencion", createEstado_mantencion);

router.delete("/estado_mantencion/:id", deleteEstado_mantencion);

router.put("/estado_mantencion/:id", updateEstado_mantencion);

export default router;
