import { Router } from "express";
import { getRepuestos, getRepuesto, createRepuesto, deleteRepuesto, updateRepuesto } from '../controllers/repuesto.controllers.js';

const router = Router();

router.get("/repuesto", getRepuestos);

router.get("/repuesto/:id", getRepuesto);

router.post("/repuesto", createRepuesto);

router.delete("/repuesto/:id", deleteRepuesto);

router.put("/repuesto/:id", updateRepuesto);

export default router;