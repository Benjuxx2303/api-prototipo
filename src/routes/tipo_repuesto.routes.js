import { Router } from "express";
import {
  getTipos_repuestos,
  getTipo_repuesto,
  createTipo_repuesto,
  deleteTipo_repuesto,
  updateTipo_repuesto,
} from "../controllers/tipo_repuesto.controllers.js";

const router = Router();

router.get("/tipo_repuesto", getTipos_repuestos);

router.get("/tipo_repuesto/:id", getTipo_repuesto);

router.post("/tipo_repuesto", createTipo_repuesto);

router.delete("/tipo_repuesto/:id", deleteTipo_repuesto);

router.put("/tipo_repuesto/:id", updateTipo_repuesto);

export default router;
