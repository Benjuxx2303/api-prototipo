import {pool} from '../db.js';

export const getSalas_ordena = async (req, res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM sala_ordena');
        res.json(rows);    
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

export const getSala_ordena = async (req, res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM sala_ordena WHERE id_sala_ordena = ?', [req.params.id]);
        if (rows.length <= 0) return res.status(404).json({
            message: 'Sala de ordeña no encontrada'
        });
        res.json(rows[0]);    
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

export const createSala_ordena = async (req, res)=> {
    const {nombre_sala, capacidad, fundo_id, tipo_sala, numero_sala} = req.body
    try {
        const [rows] = await pool.query('INSERT INTO sala_ordena (nombre_sala, capacidad, fundo_id, tipo_sala, numero_sala) VALUES (?, ?, ?, ?, ?)', [nombre_sala, capacidad, fundo_id, tipo_sala, numero_sala]);
        res.send({
            id: rows.insertId,
            nombre_sala,
            capacidad,
            fundo_id,
            tipo_sala,
            numero_sala
        });    
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

export const deleteSala_ordena = async (req, res)=> {
    try {
        const [result] = await pool.query('DELETE FROM sala_ordena WHERE id_sala_ordena = ?', [req.params.id]);
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Sala de ordeña no encontrada'
        });
        res.sendStatus(204);
    
    } catch (error) {
        return res.status(500).json({
            message: error
        })        
    }
};

export const updateSala_ordena = async (req, res)=> {
    const {id} = req.params
    const {nombre_sala, capacidad, fundo_id, tipo_sala, numero_sala} = req.body

    try {
        const [result] = await pool.query('UPDATE sala_ordena SET nombre_sala = IFNULL(?, nombre_sala), capacidad = IFNULL(?, capacidad), fundo_id = IFNULL(?, fundo_id), tipo_sala = IFNULL(?, tipo_sala), numero_sala = IFNULL(?, numero_sala) WHERE id_sala_ordena = ?', [nombre_sala, capacidad, fundo_id, tipo_sala, numero_sala, id])
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Sala de ordeña no encontrada'
        });
    
        const [rows] = await pool.query('SELECT * FROM sala_ordena WHERE id_sala_ordena = ?', [id]);
        res.json(rows[0]);
    
    } catch (error) {
        return res.status(500).json({
            message: error
        })        
    }
};