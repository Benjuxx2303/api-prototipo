import {pool} from '../db.js';

export const getUsuarios_Mantencion = async (req, res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM mantencion_has_usuario');
        res.json(rows);
    
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

export const getUsuarios_MantencionByMantencion = async (req, res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM mantencion_has_usuario WHERE mantencion_id = ?', [req.params.id]);
        if (rows.length <= 0) return res.status(404).json({
            message: 'Usuarios de mantención no encontrado'
        });
        res.json(rows);
    
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

export const createUsuarios_Mantencion = async (req, res)=> {
    const {
        mantencion_id,
        usuario_id
    } = req.body
    try {
        const [rows] = await pool.query('INSERT INTO mantencion_has_usuario (mantencion_id, usuario_id) VALUES (?, ?)', [mantencion_id, usuario_id]);
        res.send({
            mantencion_id,
            usuario_id
        });
    
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

export const deleteUsuarios_MantencionByMantencion = async (req, res)=> {
    try {
        const [result] = await pool.query('DELETE FROM mantencion_has_usuario WHERE mantencion_id = ?', [req.params.id]);
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Mantencion no encontrada'
        });
        res.sendStatus(204);
    
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};