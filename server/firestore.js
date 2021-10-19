//Inicializamos Cloud Firestore Database
const { firestore } = require('firebase-admin');
const admin = require('firebase-admin');
const serviceAccount = require('../service-account.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();



//Función para crear un usuario nuevo
function crearUser (req) {
    const data = {
        nick: req.body.nick,
        nombre: req.body.nombre,
        apellido: req.body.apellidos,   
        mail: req.body.mail,
        //peso: req.body.peso
    };
    const docRef = db.collection('users').doc(req.body.nick).set(data);
}

function crearTabla(req) {


    db.collection('users').doc(req.body.nick).collection('workouts').doc('mes1').add();
}


//Exportaciones
exports.crearUser = crearUser;