import { Router } from "express";
import { getProveedores, getProveedor, createProveedor, deleteProveedor, updateProveedor} from '../controllers/proveedor.controllers.js';

const router = Router();

router.get("/proveedor", getProveedores);

router.get("/proveedor/:id", getProveedor);

router.post("/proveedor", createProveedor);

router.delete("/proveedor/:id", deleteProveedor);

router.put("/proveedor/:id", updateProveedor);

export default router;