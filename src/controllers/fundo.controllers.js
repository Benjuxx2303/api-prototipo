import {pool} from '../db.js';

export const getFundos = async (req, res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM fundo');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

export const getFundo = async (req, res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM fundo WHERE id_fundo = ?', [req.params.id]);
        if (rows.length <= 0) return res.status(404).json({
            message: 'Fundo no encontrado'
        });
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

export const createFundo = async (req, res)=> {
    const {nombre, propietario, ubicacion, fono_contacto} = req.body
    try {
        const [rows] = await pool.query('INSERT INTO fundo (nombre, propietario, ubicacion, fono_contacto) VALUES (?, ?, ?, ?)', [nombre, propietario, ubicacion, fono_contacto]);
        res.send({
            id: rows.insertId,
            nombre,
            propietario,
            ubicacion,
            fono_contacto
        });
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

export const deleteFundo = async (req, res)=> {
    try {
        const [result] = await pool.query('DELETE FROM fundo WHERE id_fundo = ?', [req.params.id]);
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Fundo no encontrado'
        });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

export const updateFundo = async (req, res)=> {
    const {id} = req.params
    const {nombre, propietario, ubicacion, fono_contacto} = req.body
    
    try {
        const [result] = await pool.query('UPDATE fundo SET nombre = IFNULL(?, nombre), propietario = IFNULL(?, propietario), ubicacion = IFNULL(?, ubicacion), fono_contacto = IFNULL(?, fono_contacto) WHERE id_fundo = ?', [nombre, propietario, ubicacion, fono_contacto, id])
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Fundo no encontrado'
        });
    
        const [rows] = await pool.query('SELECT * FROM fundo WHERE id_fundo = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};