//Route.js - Módulo de rutas
var {Router} = require('express');
var app = Router();
var userController = require('./userController')

//Firebase.js - Módulo de la BD
const firestore = require('./firestore');


// Get mensajes
app.get('/', function (req, res) {
    //res.json()
    res.render('index', {
        titulo: "NutriGym",
        Layaout: false
    });
    //console.log('Index Works');

})
app.get('/login', (req,res) =>{

    res.render('login', {
        titulo: "Login",
    });

})

app.get('/menu',(req,res) =>{

    res.render('menu');
} );

app.get('/workout', userController.workout);

app.get('/workout/add', (req,res) => {

    res.render('addTabla');
});

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

// Post mensajes
app.post('/', function (req, res) {
    //res.json()
    res.render('index');

})

app.post('/login', (req,res) =>{

    console.log(req.body);
    firestore.crearUser(req); // Función importada de ./firestore.js
    res.redirect('/'); //Redigir cuando se realiza el login

});

app.post('/workout/add', (req,res) => {
    res.status(200).send();
    user = "TESTING"
    console.log("Rutina guardada");
    firestore.crearRutina(req.body, user);
    
});

module.exports = app;