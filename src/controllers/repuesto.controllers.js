import {pool} from '../db.js';

export const getRepuestos = async (req, res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM repuesto');
        res.json(rows);    
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

export const getRepuesto = async (req, res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM repuesto WHERE id_repuesto = ?', [req.params.id]);
        if (rows.length <= 0) return res.status(404).json({
            message: 'Repuesto no encontrado'
        });
        res.json(rows[0]);
    
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

export const createRepuesto = async (req, res)=> {
    const {
        nombre,
        descripcion,
        stock,
        tipo_repuesto_id,
        proveedor_id
    } = req.body

    try {
        const [rows] = await pool.query('INSERT INTO repuesto (nombre, descripcion, stock, tipo_repuesto_id, proveedor_id) VALUES (?, ?, ?, ?, ?)', [ nombre, descripcion, stock, tipo_repuesto_id, proveedor_id]);
        res.send({
            id: rows.insertId,
            nombre,
            descripcion,
            stock,
            tipo_repuesto_id,
            proveedor_id
        });
    
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

export const deleteRepuesto = async (req, res)=> {
    try {
        const [result] = await pool.query('DELETE FROM repuesto WHERE id_repuesto = ?', [req.params.id]);
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Repuesto no encontrado'
        });
        res.sendStatus(204);
    
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

export const updateRepuesto = async (req, res)=> {
    const {id} = req.params
    const {
        nombre,
        descripcion,
        stock,
        tipo_repuesto_id,
        proveedor_id
    } = req.body

    try {
        const [result] = await pool.query('UPDATE repuesto SET' + 
        'nombre = IFNULL(?, nombre)'+
        ', descripcion = IFNULL(?, descripcion),'+
        ', stock = IFNULL(?, stock),'+
        ', tipo_repuesto_id = IFNULL(?, tipo_repuesto_id),'+
        ', proveedor_id = IFNULL(?, proveedor_id)'+
        'WHERE id_repuesto = ?', [
            nombre,
            descripcion,
            stock,
            tipo_repuesto_id,
            proveedor_id,
            id
        ])
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Repuesto no encontrado'
        });
    
        const [rows] = await pool.query('SELECT * FROM repuesto WHERE id_repuesto = ?', [id]);
        res.json(rows[0]);
    
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};