import { Router } from "express";
import {getMaquinas_Mantencion, getMaquinas_MantencionByMantencion, createMaquina_Mantencion, deleteMaquina_MantencionByMantencion} from '../controllers/mantencion_maquina.controllers.js';

const router = Router();

router.get('/mantencionMaquina', getMaquinas_Mantencion);

router.get('/mantencionMaquina/:id', getMaquinas_MantencionByMantencion);

router.post('/mantencionMaquina', createMaquina_Mantencion);

router.delete('/mantencionMaquina/:id', deleteMaquina_MantencionByMantencion);

export default router;
