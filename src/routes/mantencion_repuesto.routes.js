import { Router } from "express";
import { getMantencion_repuestos, getMantencion_repuesto_byMantencionID, createMantencion_repuesto, deleteMantencion_repuesto_byMantencionID, updateMantencion_repuestoByMantencion } from '../controllers/mantencion_repuesto.controllers.js';

const router = Router();

router.get("/mantencionRepuesto", getMantencion_repuestos);

router.get("/mantencionRepuesto/:id", getMantencion_repuesto_byMantencionID);

router.post("/mantencionRepuesto", createMantencion_repuesto);

router.delete("/mantencionRepuesto/:id", deleteMantencion_repuesto_byMantencionID);

router.put("/mantencionRepuesto/:mantencion/:repuesto", updateMantencion_repuestoByMantencion);

export default router;