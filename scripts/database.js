import mysql from 'mysql2'

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'foodfighter',
    password: 'warrioroffood',
    database: 'foodfight',
    waitForConnections: true
}).promise()


export async function getUser(id){

    const [rows] = await pool.query('SELECT * FROM Users where user_id = ?', [id])

    return rows[0]
}


export async function getAllPosts(){

    const [rows] = await pool.query('SELECT * FROM Posts')

    return rows
}


export async function createUser(firstName, lastName, username, email, password) {
    const result = await pool.query('INSERT INTO Users (firstName, lastName, username, email, password) VALUES(?, ?, ?, ?, ?)', [firstName, lastName, username, email, password])

    console.log("New user information submitted")

    return result;
}




