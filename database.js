import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true
    }).promise();

export async function getUserById(id){
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    // console.log(rows[0]);
    return rows[0];
}

export async function getPatientByUser(userId){
    const [rows] = await pool.query('SELECT * FROM patients WHERE user_id = ?', [userId]);
    // console.log(rows[0]);
    return rows;
}

export async function getPatientById(Id){
    const [rows] = await pool.query('SELECT * FROM patients WHERE id = ?', [id]);
    // console.log(rows[0]);
    return rows[0];
}

export async function getAppointmentsByUser(userId){
    const [rows] = await pool.query('SELECT * FROM appointments WHERE user_id = ? AND  status BETWEEN 1 AND 2', [userId]);
    // console.log(rows[0]);
    return rows;
}



