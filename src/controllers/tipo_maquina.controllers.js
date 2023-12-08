import {pool} from '../db.js';

export const getTipos_maquinas = async (req, res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM tipo_maquina');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

export const getTipo_maquina = async (req, res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM tipo_maquina WHERE id_tipo_maquina = ?', [req.params.id]);
        if (rows.length <= 0) return res.status(404).json({
            message: 'Tipo de maquina no encontrado'
        });
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

export const createTipo_maquina = async (req, res)=> {
    const {nombre, descripcion} = req.body
    try {
        const [rows] = await pool.query('INSERT INTO tipo_maquina (nombre, descripcion) VALUES (?, ?)', [nombre, descripcion]);
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

export const deleteTipo_maquina = async (req, res)=> {
    try {
        const [result] = await pool.query('DELETE FROM tipo_maquina WHERE id_tipo_maquina = ?', [req.params.id]);
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Tipo de maquina no encontrado'
        });
        res.sendStatus(204);
    
    } catch (error) {
        return res.status(500).json({
            message: error
        })        
    }
};

export const updateTipo_maquina = async (req, res)=> {
    const {id} = req.params
    const {nombre, descripcion} = req.body

    try {
        const [result] = await pool.query('UPDATE tipo_maquina SET nombre = IFNULL(?, nombre), descripcion = IFNULL(?, descripcion) WHERE id_tipo_maquina = ?', [nombre, descripcion, id])
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Tipo de maquina no encontrado'
        });
    
        const [rows] = await pool.query('SELECT * FROM tipo_maquina WHERE id_tipo_maquina = ?', [id]);
        res.json(rows[0]);
    
    } catch (error) {
        return res.status(500).json({
            message: error
        })        
    }
};