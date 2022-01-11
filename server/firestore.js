//Inicializamos Cloud Firestore Database
const { query } = require('express');
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
const user = 'TESTING';
// Sentencias NoSQL



//Función para crear un usuario nuevo
function crearUser(req) {
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

function verRutinaActiva(user) {

    const sectionRef = db.collection('users').doc(user).collection('WorkOut');
    const mesActivo = sectionRef.where('Activo', '==', true).get(); //DocumentRefenciado y utilizamos el get

    mesActivo.then(querySnapshot => {
        var mes = querySnapshot.docs[0]; //Solo hay un único mes activo
        return mes.ref;
    })
    .then(mesRef => mesRef.listCollections())
    .then(listaDiasRef => {        
        var listaDias = listaDiasRef.map(diaRef =>{ //Array con los dias
            return diaRef.where('Activo', '==', true).get(); //Array con la listaSemana sin resolver
        });
        return Promise.all(listaDias); //Array con de los dias con la listaSemana resuelto
    })
    .then(dias =>{
        return dias.map(dia =>{
            const datos = dia.docs[0].data(); //Solo hay una única semana activa
            const ejercicios = Object.values(datos);
            var rutina = [];
            //Devolvemos solamente los ejericios
            for (n = 0; n<ejercicios.length -2; n++){ //SI LA SEMANA NO TIENE EJERCICIOS EL ARRAY ESTARÁ VACIO
                var ejercicioDB = ejercicios[n];
                var ejercicio = { //ENVIAMOS SOLAMENTE LOS DATOS DE LA DB QUE NOS INTERESAN (SOLAMENTE LOS DATOS RELACIONADOS CON EL CLIENTE)
                    nombre: ejercicioDB.nombre,
                    done: ejercicioDB.done,
                    intensidad: ejercicioDB.intensidad,
                    pesoMin: ejercicioDB.pesoMin,
                    rest: ejercicioDB.rest,
                    series: ejercicioDB.series
                }
                var refEjercicio = ejercicioDB.refEjercicio; //CREAMOS METODO PARA ACTUALIZAR LA COLECCION DE EJERCICIOS 

                rutina.push(ejercicio);
            }
            return rutina;
        })
    })

    .then(console.log);;
}

 
//Funcion para obtener el Usuario conectado
function getUser(nick, res) {
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

function crearRutina(body, user) {
    // console.log(body);
    var numDia = 1;
    var numSerie = 1;
    var fecha = new Date(Date.now());
    console.log(fecha);

    activado = {
        Activo: true,
        Fecha: fecha
    }
    //Creamos el mes y su referencia
    var mesRef = db.collection('users').doc(user).collection('WorkOut').doc();
    mesRef.set(activado); //Añadimos campos de datos al mes Activo y fecha

    //Creamos la semana y referencimos
    var semRef;

    body.forEach(dia => {

        //Creamos la referencia a la semana para cada día
        semRef = mesRef.collection('dia' + numDia).doc();
        semRef.set(activado);

        dia.forEach(ejer => {
            nombre = ejer.nombre;
            series = ejer.series;
            reps = ejer.reps;
            intensidad = ejer.intensidad;
            rest = ejer.rest;
            pesoMin = ejer.pesoMin;


            //Añadimos campos al ejercicio (Datos del ejercicio)
            semRef.collection('ejercicios').doc(nombre).set({
                Series: series,
                Reps: reps,
                Intensidad: intensidad,
                PesoMin: pesoMin,
                PesoSesion: "-",
                Rest: rest

            });

        });//FIN EJERCICIO

        numDia++; // Sumamos la variable para saber en que dia estamos
    });//FIN DIA



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
exports.crearRutina = crearRutina;
exports.verRutinaActiva = verRutinaActiva;