
// Cuando se instala
self.addEventListener('install', event => {

    console.log('SW: Instalado');

});

// Cuando se activa
self.addEventListener('activate', e => {



});

// Escuchando las peticiones
self.addEventListener('fetch', e => {

    console.log('Escuchando las peticiones a la web');

})