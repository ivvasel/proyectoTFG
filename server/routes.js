//Route.js - Módulo de rutas
var {Router} = require('express');
var app = Router();


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

})

module.exports = app;