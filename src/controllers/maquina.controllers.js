import {pool} from '../db.js';

export const getMaquinas = async (req, res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM maquina');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

export const getMaquina = async (req, res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM maquina WHERE id_maquina = ?', [req.params.id]);
        if (rows.length <= 0) return res.status(404).json({
            message: 'Maquina no encontrada'
        });
        res.json(rows[0]);
    
    } catch (error) {
        return res.status(500).json({
            message: error
        })        
    }
};

export const createMaquina = async (req, res)=> {
    const {
        nombre,
        descripcion,
        modelo,
        serie,
        tipo_maquina_id,
        sala_ordena_id,
        fecha_fabrica
    } = req.body

    try {
        const [rows] = await pool.query(`INSERT INTO maquina (nombre, descripcion, modelo, serie, tipo_maquina_id, sala_ordena_id, fecha_fabrica) VALUES (?, ?, ?, ?, ?, ?, STR_TO_DATE(?, '%d-%m-%Y'))`, [ nombre, descripcion, modelo, serie, tipo_maquina_id, sala_ordena_id, fecha_fabrica]);
        res.send({
            id: rows.insertId,
            nombre,
            descripcion,
            modelo,
            serie,
            tipo_maquina_id,
            sala_ordena_id,
            fecha_fabrica
        });
    
    } catch (error) {
        return res.status(500).json({
            message: error
        })        
    }
};

export const deleteMaquina = async (req, res)=> {
    try {
        const [result] = await pool.query('DELETE FROM maquina WHERE id_maquina = ?', [req.params.id]);
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Maquina no encontrada'
        });
        res.sendStatus(204);
    
    } catch (error) {
        return res.status(500).json({
            message: error
        })        
    }
};

export const updateMaquina = async (req, res)=> {
    const {id} = req.params
    const {
        nombre,
        descripcion,
        modelo,
        serie,
        tipo_maquina_id,
        sala_ordena_id,
        fecha_fabrica
    } = req.body

    try {
        const [result] = await pool.query('UPDATE maquina SET' + 
        'nombre = IFNULL(?, nombre)'+
        ', descripcion = IFNULL(?, descripcion),'+
        ', hora_salida = IFNULL(?, hora_salida),'+
        ', modelo = IFNULL(?, modelo),'+
        ', serie = IFNULL(?, serie),'+
        ', tipo_maquina_id = IFNULL(?, tipo_maquina_id),'+
        ', fecha_fabrica = IFNULL(?, fecha_fabrica)'+
        'WHERE id_maquina = ?', [
            nombre,
            descripcion,
            modelo,
            serie,
            tipo_maquina_id,
            sala_ordena_id,
            fecha_fabrica,
            id
        ])
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Maquina no encontrada'
        });
    
        const [rows] = await pool.query('SELECT * FROM maquina WHERE id_maquina = ?', [id]);
        res.json(rows[0]);
    
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};