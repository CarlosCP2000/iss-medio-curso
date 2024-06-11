const express = require("express")
const uri = 'mongodb+srv://carlos1404:RE5ZviZdJPVhpgOV@clusterdb.mqn8rgo.mongodb.net/?retryWrites=true&w=majority&appName=ClusterDB'

const mongoose = require('mongoose');
mongoose.connect(uri);
const app = express()
app.use(express.json())
const port = 8081
const {usuarioModel} = require('./models');
app.get('/', (req, res) => {
    res.send("I am alive Usuario");
})

app.get('/usuario', async (req, res) => {
    const usuario = await usuarioModel.find({});
    res.json(usuario);
});

app.post('/usuario', async (req, res) => {
    const user = await usuarioModel.find({username: req.body.username});
    res.json(user);
});

app.post('/usuario', async (req, res) => {
    try {
        const username = req.body.username;
        const name = req.body.name;
        const lastname = req.body.lastname;

        const usuario = new usuarioModel({ username, name, lastname });
        const data = await usuario.save();
        return res.status(201).json(data);

    } catch (error) {
        console.log('Error', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

