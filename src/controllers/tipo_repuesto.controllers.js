import {pool} from '../db.js';

export const getTipos_repuestos = async (req, res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM tipo_repuesto');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

export const getTipo_repuesto = async (req, res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM tipo_repuesto WHERE id_tipo_repuesto = ?', [req.params.id]);
        if (rows.length <= 0) return res.status(404).json({
            message: 'Tipo de repuesto no encontrado'
        });
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

export const createTipo_repuesto = async (req, res)=> {
    const {nombre, descripcion} = req.body
    try {
        const [rows] = await pool.query('INSERT INTO tipo_repuesto (nombre, descripcion) VALUES (?, ?)', [nombre, descripcion]);
        res.send({
            id: rows.insertId,
            nombre,
            descripcion
        });
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

export const deleteTipo_repuesto = async (req, res)=> {
    try {
        const [result] = await pool.query('DELETE FROM tipo_repuesto WHERE id_tipo_repuesto = ?', [req.params.id]);
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Tipo de repuesto no encontrado'
        });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

export const updateTipo_repuesto = async (req, res)=> {
    const {id} = req.params
    const {nombre, descripcion} = req.body
    
    try {
        const [result] = await pool.query('UPDATE tipo_repuesto SET nombre = IFNULL(?, nombre), descripcion = IFNULL(?, descripcion) WHERE id_tipo_repuesto = ?', [nombre, descripcion, id])
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Tipo de repuesto no encontrado'
        });
    
        const [rows] = await pool.query('SELECT * FROM tipo_repuesto WHERE id_tipo_repuesto = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: error
        })        
    }
};