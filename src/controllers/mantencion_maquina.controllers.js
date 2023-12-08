import {pool} from '../db.js';

export const getMaquinas_Mantencion = async (req, res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM mantencion_has_maquina');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

export const getMaquinas_MantencionByMantencion = async (req, res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM mantencion_has_maquina WHERE mantencion_id = ?', [req.params.id]);
        if (rows.length <= 0) return res.status(404).json({
            message: 'Maquinas de mantención no encontradas'
        });
        res.json(rows);
    
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

export const createMaquina_Mantencion = async (req, res)=> {
    const {
        mantencion_id,
        maquina_id
    } = req.body
    try {
        const [rows] = await pool.query('INSERT INTO mantencion_has_maquina (mantencion_id, maquina_id) VALUES (?, ?)', [mantencion_id, maquina_id]);
        res.send({
            mantencion_id,
            maquina_id
        });
    
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

export const deleteMaquina_MantencionByMantencion = async (req, res)=> {
    try {
        const [result] = await pool.query('DELETE FROM mantencion_has_maquina WHERE mantencion_id = ?', [req.params.id]);
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

