import {pool} from '../db.js';

export const getEstados_mantenciones = async (req, res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM estado_mantencion');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            messsage: error
        })
    }
};

export const getEstado_mantencion = async (req, res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM estado_mantencion WHERE id_estado_mantencion = ?', [req.params.id]);
        if (rows.length <= 0) return res.status(404).json({
            message: 'Estado no encontrado'
        });
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

export const createEstado_mantencion = async (req, res)=> {
    const {nombre} = req.body
    try {
        const [rows] = await pool.query('INSERT INTO estado_mantencion (nombre) VALUES (?)', [nombre]);
        res.send({
            id: rows.insertId,
            nombre
        });
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

export const deleteEstado_mantencion = async (req, res)=> {
    try {
        const [result] = await pool.query('DELETE FROM estado_mantencion WHERE id_estado_mantencion = ?', [req.params.id]);
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Estado no encontrado'
        });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

export const updateEstado_mantencion = async (req, res)=> {
    const {id} = req.params
    const {nombre} = req.body
    
    try {
        const [result] = await pool.query('UPDATE estado_mantencion SET nombre = IFNULL(?, nombre) WHERE id_estado_mantencion = ?', [nombre, id])
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Estado no encontrado'
        });
    
        const [rows] = await pool.query('SELECT * FROM estado_mantencion WHERE id_estado_mantencion = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};