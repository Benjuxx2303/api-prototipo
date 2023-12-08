import { Router } from "express";
import {
  getMantenciones,
  getMantencion,
//   createMantencion,
  createMantencionInicial,
  deleteMantencion,
  updateMantencion,
} from "../controllers/mantencion.controllers.js";

const router = Router();

router.get("/mantencion", getMantenciones);

router.get("/mantencion/:id", getMantencion);

router.post("/mantencion", createMantencionInicial);

router.delete("/mantencion/:id", deleteMantencion);

router.put("/mantencion/:id", updateMantencion);

export default router;
