const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());

// MySQL Connection
const pool = mysql.createPool({
    host: 'local_host',
    user: 'foodfighter',
    password: 'warrioroffood',
    database: 'foodfight',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Create - Add data to the database
    //User table 
app.post('/data', async (req, res) => {
    try {
        const newData = req.body;
        const connection = await pool.getConnection();
        const [rows] = await connection.query('INSERT INTO Users (username, email, password, first_name, last_name) VALUES(?)', [newData]);
        connection.release();
        res.status(201).json({ message: 'Data added to database', insertedId: rows.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read - Get data from the database
app.get('/data', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Users');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update - Modify data in the database
app.put('/data/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const [rows] = await pool.query('UPDATE Users SET ? WHERE id = ?', [updatedData, id]);
        res.json({ message: 'Data updated', affectedRows: rows.affectedRows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete - Remove data from the database
app.delete('/data/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('DELETE FROM Users WHERE id = ?', [id]);
        res.json({ message: 'Data deleted', affectedRows: rows.affectedRows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
