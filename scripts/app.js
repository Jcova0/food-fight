import express from 'express'
import { getAllPosts, createUser } from './database.js'

const app = express()

app.use(express.json())

app.get("/allPosts", async (req, res) => {
    const user = await getAllPosts()
    res.send(user)
})

app.post("/newUser", async (req, res) => {
    const { firstName, lastName, username, email, password} = req.body;
    try {
        const newUser = await createUser(firstName, lastName, username, email, password);
        res.status(201).json(newUser); // Send the newly created user as a JSON response
    } catch (error) {
        console.error('Error creating user: ', error);
        res.status(500).json({ error: 'Error creating user. Please try again later.' }); // Send an error response in case of failure
    }
});


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

  app.listen(8080, () => {
    console.log('Server is running on port 8080')
  })