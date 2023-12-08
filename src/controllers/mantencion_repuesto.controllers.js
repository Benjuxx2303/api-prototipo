import {pool} from '../db.js';

export const getMantencion_repuestos = async (req, res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM mantencion_has_repuesto');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

export const getMantencion_repuesto_byMantencionID = async (req, res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM mantencion_has_repuesto WHERE mantencion_id = ?', [req.params.id]);
        if (rows.length <= 0) return res.status(404).json({
            message: 'Repuestos de mantención no encontrado'
        });
        res.json(rows);
    
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

export const createMantencion_repuesto = async (req, res)=> {
    const {
        mantencion_id,
        repuesto_id,
        cantidad
    } = req.body

    try {
        const [rows] = await pool.query('INSERT INTO mantencion_has_repuesto (mantencion_id, repuesto_id, cantidad) VALUES (?, ?, ?)', [ mantencion_id, repuesto_id, cantidad]);
        res.send({
            mantencion_id,
            repuesto_id,
            cantidad
        });
    
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

export const deleteMantencion_repuesto_byMantencionID = async (req, res)=> {
    try {
        const [result] = await pool.query('DELETE FROM mantencion_has_repuesto WHERE mantencion_id = ?', [req.params.id]);
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

// Actualizar cantidad
export const updateMantencion_repuestoByMantencion = async (req, res)=> {
    const mantencionId = req.params.mantencion;
    const repuestoId = req.params.repuesto;
    const {
        cantidad
    } = req.body

    try {
        const [result] = await pool.query('UPDATE mantencion_has_repuesto SET' + 
        ' cantidad = IFNULL(?, cantidad)'+
        'WHERE mantencion_id = ? AND repuesto_id = ?', [
            cantidad,
            mantencionId,
            repuestoId
        ])
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Mantencion no encontrada'
        });
    
        const [rows] = await pool.query('SELECT * FROM mantencion_has_repuesto WHERE mantencion_id = ? AND repuesto_id = ?', [mantencionId, repuestoId]);
        res.json(rows);
    
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};