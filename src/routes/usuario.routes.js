import { Router } from "express";
import {
  getUsuarios,
  getUsuario,
  createUsuario,
  deleteUsuario,
  updateUsuario,
} from "../controllers/usuario.controllers.js";

const router = Router();

router.get("/usuario", getUsuarios);

router.get("/usuario/:id", getUsuario);

router.post("/usuario", createUsuario);

router.delete("/usuario/:id", deleteUsuario);

router.put("/usuario/:id", updateUsuario);

export default router;
