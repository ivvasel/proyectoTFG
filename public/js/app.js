var url = window.location.href; //Obtiene la URL de la ventana
var swLocation = '/NutriGym/sw.js';

//Comprueba si el navegador permite SW
if (navigator.serviceWorker) {

    //Linea de código para cuando hacemos pruebas en localhost
    if( url.includes('localhost') ) {
        swLocation = '/sw.js';
        console.log('Pruebas Localhost');
    }

    //navigator.serviceWorker.register(swLocation);
}