//Inicializamos Cloud Firestore Database
const { firestore } = require('firebase-admin');
const admin = require('firebase-admin');
const serviceAccount = require('../service-account.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

//Variables
var prueba = {
    Ejercicio: 'Press MIlitar',
    Repes: 1
}
const user = 'IvanVa';
// Sentencias NoSQL
const usersRef = db.collection('users');
const userRef = usersRef.doc(user);
const workoutRef = userRef.collection('WorkOut');


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

function crearTabla(/*req*/) {

    db.collection('users').doc('Prueba').collection('workouts').doc('mes1').collection('dia1').add(prueba);
}

function verTabla(){

    usersRef.doc('IvanVa')
    .collection('WorkOut').doc('mes1')
        .listCollections()
        .then(collections =>{
            for (let collection of collections){ // obtiene colecion de coleciones
                console.log(`Found collection with id: ${collection.id}`);
                console.log(`Patch: ${collection._settings}`);
            }
        });
}

function addEjercicio (){
    userRef
}

//Instrucción para listar las colecciones
// usersRef.doc('IvanVa').listCollections()
//         .then(collections =>{
//             for (let collection of collections){ // obtiene colecion de coleciones
//                 console.log(`Found collection with id: ${collection.id}`);
//             }
//         });


//Ejecuciones Prueba
//crearTabla();
//verTabla();


//Exportaciones
exports.crearUser = crearUser;