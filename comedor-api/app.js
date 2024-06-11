const express = require("express")
const uri = 'mongodb+srv://carlos1404:RE5ZviZdJPVhpgOV@clusterdb.mqn8rgo.mongodb.net/?retryWrites=true&w=majority&appName=ClusterDB'
const usuario_api = require("./services/usuario-service");

const mongoose = require('mongoose');
mongoose.connect(uri);
const app = express()
app.use(express.json())
const port = 8080
const {comedorModel} = require('./models');
app.get('/', (req, res) => {
    res.send("I am alive Comedor");
})

app.get('/comedor', async (req, res) => {
    const comedor = await comedorModel.find({});
    res.json(comedor);
});
app.post('/comedor/valid/user', async (req, res) => {
    const username = req.body.username;

    // Verificar si el nombre de usuario está vacío o es undefined
    if (!username || username.trim() === "") {
        return res.status(403).json({ message: 'El nombre de usuario es requerido' });
    }

    try {
        const is_valid = await usuario_api.post(username);

        if (!is_valid || !is_valid[0]) {
            return res.status(403).json({ message: 'El usuario no se encuentra registrado' });
        }

        const comedor = await comedorModel.find({});
        res.json(comedor);
    } catch (error) {
        // Manejar cualquier error que ocurra durante la solicitud
        res.status(500).json({ message: 'Error al validar el usuario', error: error.message });
    }
});
app.post('/comedor', async (req, res) => {
    try {
        const plato = req.body.plato;

        const comedor = new comedorModel({ plato });
        const data = await comedor.save();
        return res.status(201).json(data);

    } catch (error) {
        console.log('Error', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

