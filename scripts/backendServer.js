const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');
const multer = require('multer');

const cors = require("cors");
// require('dotenv').config();

const app = express();

//production
const corsOptions = {
    origin: ['http://76.174.52.44','http://localhost'],   // Replace this with your frontend origin
    // methods: 'GET,POST'              // Adjust this according to the allowed methods
     //allowedHeaders: 'Content-Type,Authorization', // Adjust headers if needed
   };
   
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//define image storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Files will be stored in the 'uploads' directory
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });


// MySQL Connection
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'foodfighter',
    password: 'warrioroffood',
    database: 'foodfight',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


//test db connection
pool.getConnection((err, connection) => {
    console.log("attempting to connect to mysql");
    if (err) {
        console.log('Error getting database connection:', err.code);
        // Logging the connection refusal error
    } else {
        console.log('Connected to the database!');
        connection.release(); // Release the connection back to the pool after use
    }
});


app.post('/createPostImage', upload.single('postImage'), async (req, res) => {
  console.log('Create post with Image initiated');
  try {
    const imageUrl = req.file ? req.file.filename : null; // Get the uploaded file name (if exists)
    const { postDescription, postTitle } = req.body;

    const [rows] = await pool.query('INSERT INTO Posts (image_url, caption, title) VALUES ( ?, ?, ?)', [ imageUrl, postDescription, postTitle]);

    res.status(201).json({ message: 'Data added to database', insertedId: rows.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});

// Add user account to the database
app.post('/createUser', async (req, res) => {
    console.log('Create user initiated')
    try {
        // const newData = req.body;
        // const connection = await pool.getConnection();
        const [rows] = await pool.query('INSERT INTO Users (username, email, password, first_name, last_name) VALUES(?, ?, ?, ?, ?)', [req.body.username, req.body.email, req.body.password, req.body.first_name, req.body.last_name]);
        // connection.release();
        res.status(201).json({ message: 'Data added to database', insertedId: rows.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// view posts
app.get('/getPosts', async (req, res) => {
    console.log('get posts initiated')
    try {
        const [posts] = await pool.query('SELECT * FROM Posts');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//check for existing user accounts/login 
app.post('/login', async (req, res) => {
    console.log("Login credential check initiated")
    try {
        const [rows] = await pool.query('SELECT username, user_id FROM Users WHERE (username = ? OR email = ?) AND password = ?;', [req.body.identifier, req.body.identifier, req.body.password]);
        res.status(202).json(rows[0]);
        console.log("Login successful")
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("Login failed")
        
    }
});

// Update - Modify rating
app.post('/upvote', async (req, res) => {
    console.log("upvote detected");

    try {
        const { postId } = req.body;
        console.log("Post upvote attempt", postId);
        const [rows] = await pool.query('UPDATE Posts SET rating = rating + 1 WHERE post_id=?;',[postId])
        res.json({ message: 'Post Upvoted!', affectedRows: rows.affectedRows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update - Modify rating
app.post('/downvote', async (req, res) => {
    console.log("Downvote detected");
    try {
        const { postId } = req.body;
        console.log("Post upvote attempt", postId);
        const [rows] = await pool.query('UPDATE Posts SET rating = rating - 1 WHERE post_id=?;',[postId])
        res.json({ message: 'Post Downvoted!', affectedRows: rows.affectedRows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
