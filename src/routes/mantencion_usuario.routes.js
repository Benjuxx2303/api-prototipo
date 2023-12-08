import { Router } from "express";
import {getUsuarios_Mantencion, getUsuarios_MantencionByMantencion, createUsuarios_Mantencion, deleteUsuarios_MantencionByMantencion} from "../controllers/mantencion_usuario.controllers.js"

const router = Router();

router.get('/mantencionUsuario', getUsuarios_Mantencion);

router.get('/mantencionUsuario/:id', getUsuarios_MantencionByMantencion);

router.post('/mantencionUsuario', createUsuarios_Mantencion);

router.delete('/mantencionUsuario/:id', deleteUsuarios_MantencionByMantencion);

export default router;
