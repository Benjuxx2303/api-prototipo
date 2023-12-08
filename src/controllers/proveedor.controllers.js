import {pool} from '../db.js';

export const getProveedores = async (req, res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM proveedor');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

export const getProveedor = async (req, res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM proveedor WHERE id_proveedor = ?', [req.params.id]);
        if (rows.length <= 0) return res.status(404).json({
            message: 'Proveedor no encontrado'
        });
        res.json(rows[0]);
    
    } catch (error) {
        return res.status(500).json({
            message: error
        })        
    }
};

export const createProveedor = async (req, res)=> {
    const {nombre, fono, correo, descripcion} = req.body
    try {
        const [rows] = await pool.query('INSERT INTO proveedor (nombre, fono, correo, descripcion) VALUES (?, ?, ?, ?)', [nombre, fono, correo, descripcion]);
        res.send({
            id: rows.insertId,
            nombre,
            fono,
            correo,
            descripcion
        });
    
    } catch (error) {
        return res.status(500).json({
            message: error
        })        
    }
};

export const deleteProveedor = async (req, res)=> {
    try {
        const [result] = await pool.query('DELETE FROM proveedor WHERE id_proveedor = ?', [req.params.id]);
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Proveedor no encontrado'
        });
        res.sendStatus(204);
    
    } catch (error) {
        return res.status(500).json({
            message: error
        })        
    }
};

export const updateProveedor = async (req, res)=> {
    const {id} = req.params
    const {nombre, fono, correo, descripcion} = req.body

    try {
        const [result] = await pool.query('UPDATE proveedor SET nombre = IFNULL(?, nombre), fono = IFNULL(?, fono), correo = IFNULL(?, correo), descripcion = IFNULL(?, descripcion) WHERE id_proveedor = ?', [nombre, fono, correo, descripcion, id])
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Proveedor no encontrado'
        });
    
        const [rows] = await pool.query('SELECT * FROM proveedor WHERE id_proveedor = ?', [id]);
        res.json(rows[0]);
    
    } catch (error) {
        return res.status(500).json({
            message: error
        })        
    }
};