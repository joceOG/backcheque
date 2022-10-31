const express = require('express');
const mongoose = require('mongoose');

const Banque = require('./banque');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use(express.json());

mongoose.connect('mongodb+srv://jocespeedcode:joce03232323@cluster0.84okv.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


app.post('/api/banque', (req, res) => {
    console.log(req.body)
    delete req.body._id;
    const banque = new Banque({
        ...req.body
    });
    banque.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
});

app.use('/api/recette', (req, res) => {
    Recette.find()
        .then(recette => res.status(200).json(recette))
        .catch(error => res.status(400).json({ error }));
});

// app.use((req, res, next) => {
//     console.log('Requête reçue !');
//     next();
// });

// app.use((req, res, next) => {
//     res.status(201);
//     next();
// });

// app.use((req, res, next) => {
//     console.log('Réponse envoyée avec succès !');
// });

module.exports = app;