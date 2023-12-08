import express from "express";
import indexRoutes from "./routes/index.routes.js";
import rolRoutes from "./routes/rol.routes.js";
import usuarioRoutes from "./routes/usuario.routes.js";
import fundoRoutes from "./routes/fundo.routes.js";
import estado_mantencionRoutes from "./routes/estado_mantencion.routes.js";
import tipo_repuestoRoutes from "./routes/tipo_repuesto.routes.js";
import tipo_maquinaRoutes from "./routes/tipo_maquina.routes.js";
import proveedorRoutes from "./routes/proveedor.routes.js";
import sala_OrdenaRoutes from "./routes/sala_ordena.routes.js";
import mantencionRoutes from "./routes/mantencion.routes.js";
import maquinaRoutes from "./routes/maquina.routes.js";
import repuestoRoutes from "./routes/repuesto.routes.js";
import mantencion_repuestoRoutes from "./routes/mantencion_repuesto.routes.js";
import mantencion_usuarioRoutes from "./routes/mantencion_usuario.routes.js";
import mantencion_maquinaRoutes from './routes/mantencion_maquina.routes.js';

const app = express();
app.use(express.json());

app.use(indexRoutes);
app.use("/api/", rolRoutes);
app.use("/api/", usuarioRoutes);
app.use("/api/", fundoRoutes);
app.use("/api/", estado_mantencionRoutes);
app.use("/api/", tipo_repuestoRoutes);
app.use("/api/", tipo_maquinaRoutes);
app.use("/api/", proveedorRoutes);
app.use("/api/", sala_OrdenaRoutes);
app.use("/api/", mantencionRoutes);
app.use("/api/", maquinaRoutes);
app.use("/api/", repuestoRoutes);
app.use("/api/", mantencion_repuestoRoutes);
app.use("/api/", mantencion_usuarioRoutes);
app.use('/api/', mantencion_maquinaRoutes);

app.use((req, res, next) =>{
    res.status(404).json({
        message: 'endpoint Not found'
    })
})

export default app;