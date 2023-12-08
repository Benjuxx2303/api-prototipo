import {pool} from '../db.js';

export const getMantenciones = async (req, res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM mantencion');
        res.json(rows);
    
    } catch (error) {
        return res.status(500).json({
            message: error
        })        
    }
};

export const getMantencion = async (req, res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM mantencion WHERE id_mantencion = ?', [req.params.id]);
        if (rows.length <= 0) return res.status(404).json({
            message: 'Mantencion no encontrada'
        });
        res.json(rows[0]);
    
    } catch (error) {
        return res.status(500).json({
            message: error
        })        
    }
};

export const createMantencion = async (req, res)=> {
    const {
        fecha_realizada,
        hora_llegada,
        hora_salida,
        urgencia,
        monto,
        kilometraje,
        detalle,
        mantencion_id,
        fecha_programada,
        tipo_mantencion,
        estado_mantencion_id
    } = req.body
    try {
        const [rows] = await pool.query('INSERT INTO mantencion (fecha_realizada, hora_llegada, hora_salida, urgencia, monto, kilometraje, detalle, mantencion_id, fecha_programada, tipo_mantencion, estado_mantencion_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [fecha_realizada, hora_llegada, hora_salida, urgencia, monto, kilometraje, detalle, mantencion_id, fecha_programada, tipo_mantencion, estado_mantencion_id]);
        res.send({
            id: rows.insertId,
            fecha_realizada,
            hora_llegada,
            hora_salida,
            urgencia,
            monto,
            kilometraje,
            detalle,
            mantencion_id,
            fecha_programada,
            tipo_mantencion,
            estado_mantencion_id
        });
    
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

export const deleteMantencion = async (req, res)=> {
    try {
        const [result] = await pool.query('DELETE FROM mantencion WHERE id_mantencion = ?', [req.params.id]);
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Mantención no encontrada'
        });
        res.sendStatus(204);
    
    } catch (error) {
        return res.status(500).json({
            message: error
        })        
    }
};

export const updateMantencion = async (req, res)=> {
    const {id} = req.params
    const {
        fecha_realizada,
        hora_llegada,
        hora_salida,
        urgencia,
        monto,
        kilometraje,
        detalle,
        mantencion_id,
        fecha_programada,
        tipo_mantencion,
        estado_mantencion_id
    } = req.body

    try {
        const [result] = await pool.query('UPDATE mantencion SET' + 
        'fecha_realizada = IFNULL(?, fecha_realizada)'+
        ', hora_llegada = IFNULL(?, hora_llegada),'+
        ', hora_salida = IFNULL(?, hora_salida),'+
        ', urgencia = IFNULL(?, urgencia),'+
        ', monto = IFNULL(?, monto),'+
        ', kilometraje = IFNULL(?, kilometraje),'+
        ', detalle = IFNULL(?, detalle),'+
        ', mantencion_id = IFNULL(?, mantencion_id),'+
        ', fecha_programada = IFNULL(?, fecha_programada),'+
        ', tipo_mantencion = IFNULL(?, tipo_mantencion),'+
        ', estado_mantencion_id = IFNULL(?, estado_mantencion_id)'+
        'WHERE id_mantencion = ?', [
            fecha_realizada,
            hora_llegada,
            hora_salida,
            urgencia,
            monto,
            kilometraje,
            detalle,
            mantencion_id,
            fecha_programada,
            tipo_mantencion,
            estado_mantencion_id,
            id
        ])
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Mantencion no encontrada'
        });
    
        const [rows] = await pool.query('SELECT * FROM mantencion WHERE id_mantencion = ?', [id]);
        res.json(rows[0]);
    
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

export const createMantencionInicial = async (req, res)=> {
    const {
        fecha_programada,
        tipo_mantencion,
        estado_mantencion_id
    } = req.body

    try {
        const [rows] = await pool.query(`INSERT INTO mantencion (fecha_programada, tipo_mantencion, estado_mantencion_id) VALUES (STR_TO_DATE(?, '%d-%m-%Y'), ?, ?)`, [fecha_programada, tipo_mantencion, estado_mantencion_id]);
        res.send({
            id: rows.insertId,
            fecha_programada,
            tipo_mantencion,
            estado_mantencion_id
        });
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};