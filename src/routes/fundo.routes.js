import { Router } from "express";
import {
  getFundos,
  getFundo,
  createFundo,
  deleteFundo,
  updateFundo,
} from "../controllers/fundo.controllers.js";

const router = Router();

router.get("/fundo", getFundos);

router.get("/fundo/:id", getFundo);

router.post("/fundo", createFundo);

router.delete("/fundo/:id", deleteFundo);

router.put("/fundo/:id", updateFundo);

export default router;
