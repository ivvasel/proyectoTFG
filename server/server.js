const express = require('express');
const morgan = require('morgan');
const path = require('path');
//const admin = require('firebase-admin');

const app = express();

// settings
const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000; //utiliza un puerto config o el 3000
// Directorio Público
app.use(express.static(publicPath));


//HanddleBars
const hbs = require('hbs');
const viewsPath = publicPath + '/views';

hbs.registerPartials(viewsPath + '/partials', function (err) {})
app.set('view engine', 'hbs');
app.set('views', viewsPath);



// Escuchando el puerto
app.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});

// middlewares
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies


// Rutas 
const routes = require('./routes');
app.use('/', routes );




