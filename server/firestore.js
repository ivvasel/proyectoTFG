//Inicializamos Cloud Firestore Database
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

}

//Funcion para obtener el Usuario conectado
function getUser (nick,res){  
    //console.log(res);  
    let nicks = [];
    let names = [];
    let mails = [];
    let collection = db.collection('users').get();
    collection
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // html = `
            // <tr>
            //     <th scope="row">${doc.id}</th>
            //     <td>${doc.data().nick}</td>
            //     <td>${doc.data().name}</td>
            //     <td>${doc.data().mail}</td>
            // </tr>
            // `;
            nicks.push(doc.data().nick);
            names.push(doc.data().nombre);
            mails.push(doc.data().mail);
            
            
        });
        //console.log(nicks,names,mails);
        
    });
    return tabla = ['Luis',
        'Pepe']

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
exports.getUser = getUser;