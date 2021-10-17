//Route.js - Módulo de rutas
var {Router} = require('express');
var app = Router();

//Inicializamos Cloud Firestore Database
const admin = require('firebase-admin');
const serviceAccount = require('../service-account.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();


// Get mensajes
app.get('/', function (req, res) {
    //res.json()
    res.render('index', {titulo: "NutriGym"});
    //console.log('Index Works');

})
app.get('/login', (req,res) =>{

    res.render('login', {titulo: "Login"});


})

// Post mensajes
app.post('/', function (req, res) {
    //res.json()
    res.render('index');

})

app.post('/login', (req,res) =>{

    console.log(req.body);

    const data = {
        nick: req.body.nick,
        nombre: req.body.nombre,
        apellido: req.body.apellidos,   
        mail: req.body.mail,
        //peso: req.body.peso
    };

    const docRef = db.collection('users').doc(req.body.nick).set(data);;
    





    res.redirect('/'); //Redigir cuando se realiza el login

});


module.exports = app;