import {pool} from '../db.js';

export const getUsuarios = async (req, res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM usuario');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

export const getUsuario = async (req, res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM usuario WHERE id_usuario = ?', [req.params.id]);
        if (rows.length <= 0) return res.status(404).json({
            message: 'Usuario no encontrado'
        });
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

export const createUsuario = async (req, res)=> {
    const {rut, nombre, apellido, correo, contrasena, telefono, rol_id} = req.body
    try {
        const [rows] = await pool.query('INSERT INTO usuario (rut, nombre, apellido, correo, contrasena, telefono, rol_id) VALUES (?, ?, ?, ?, ?, ?, ?)', [rut, nombre, apellido, correo, contrasena, telefono, rol_id]);
        res.send({
            id: rows.insertId,
            rut,
            nombre,
            apellido, 
            correo,
            contrasena,
            telefono,
            rol_id
        });
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

export const deleteUsuario = async (req, res)=> {
    try {
        const [result] = await pool.query('DELETE FROM usuario WHERE id_usuario = ?', [req.params.id]);
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Usuario no encontrado'
        });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

export const updateUsuario = async (req, res)=> {
    const {id} = req.params
    const {rut, nombre, apellido, correo, contrasena, telefono, rol_id} = req.body
    
    try {
        const [result] = await pool.query('UPDATE usuario SET rut = IFNULL(?, rut), nombre = IFNULL(?, nombre), apellido = IFNULL(?, apellido), correo = IFNULL(?, correo), contrasena = IFNULL(?, contrasena), telefono = IFNULL(?, telefono), rol_id = IFNULL(?, rol_id) WHERE id_usuario = ?', [rut, nombre, apellido, correo, contrasena, telefono, rol_id, id])
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Usuario no encontrado'
        });
    
        const [rows] = await pool.query('SELECT * FROM usuario WHERE id_usuario = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};