import {pool} from '../db.js';

export const getRoles = async (req, res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM rol');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

export const getRol = async (req, res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM rol WHERE id_rol = ?', [req.params.id]);
        if (rows.length <= 0) return res.status(404).json({
            message: 'Rol no encontrado'
        });
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

export const createRol = async (req, res)=> {
    const {nombre, descripcion} = req.body
    try {
        const [rows] = await pool.query('INSERT INTO rol (nombre, descripcion) VALUES (?, ?)', [nombre, descripcion])
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

export const deleteRol = async (req, res)=> {
    try {
        const [result] = await pool.query('DELETE FROM rol WHERE id_rol = ?', [req.params.id]);
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Rol no encontrado'
        });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

export const updateRol = async (req, res)=> {
    const {id} = req.params
    const {nombre, descripcion} = req.body;
    
    try {
        const [result] = await pool.query('UPDATE rol SET nombre = IFNULL(?, nombre), descripcion = IFNULL(?, descripcion) WHERE id_rol = ?', [nombre, descripcion, id])
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Rol no encontrado'
        });
    
        const [rows] = await pool.query('SELECT * FROM rol WHERE id_rol = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}