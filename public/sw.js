importScripts('https://cdn.jsdelivr.net/npm/pouchdb@7.0.0/dist/pouchdb.min.js')

importScripts('js/sw-utils.js');

const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';


const APP_SHELL = [
    '/',
    'js/app.js',
    'css/menu.css',
    'js/sw-utils.js'
];

const APP_SHELL_INMUTABLE = [
    'https://cdn.jsdelivr.net/npm/pouchdb@7.0.0/dist/pouchdb.min.js'
];


// Cuando se instala
self.addEventListener('install', e => {

    console.log('SW: Instalado');
 

    //Inicializa el los cache (descarga los archivos al cache)
    const cacheStatic = caches.open( STATIC_CACHE )
        .then(cache => cache.addAll( APP_SHELL));

    const cacheInmutable = caches.open( INMUTABLE_CACHE )
        .then(cache => cache.addAll( APP_SHELL_INMUTABLE));

    // //Espera hasta que se completen ambas problemas
    e.waitUntil( Promise.all([ cacheStatic, cacheInmutable]) );

});

// Cuando se activa
self.addEventListener('activate', e => {

    console.log('SW: Activado')

    // Borramos la versión de caches antiguas
    const respuesta = caches.keys().then( keys => {

        keys.forEach( key => {

            if ( key !== STATIC_CACHE && key.includes('static') ){
                return caches.delete(key);
            }

            if ( key !== DYNAMIC_CACHE && key.includes('dynamic') ){
                return caches.delete(key);
            }

        });

    });

    e.waitUntil( respuesta );

});


// Escuchando las peticiones (intercepta las peticiones)
self.addEventListener('fetch', e => {
    console.log('Escuchando las peticiones a la web');
    let respuesta;

    if (e.request.url.includes('/api') ) {

        console.log('Manejo de api');
    

    }else {
        //Buscamos la peticion en los caches y devuelve la respuesta a la promesa
        respuesta = caches.match( e.request ).then( res => {
            if ( res ) {

                actualizaCacheStatico (STATIC_CACHE, e.request, APP_SHELL_INMUTABLE);
                return res;
            }else {
                //Si no esta en los caches se solicita a la web
                return fetch( e.request ).then( newRes => {
                    //Guardamos en el cacheDinamico las nuevas peticiones
                    return actualizaCacheDinamico  (DYNAMIC_CACHE, e.request, newRes);

                });
            }

        });
    }

    //Respondemos a la apliación
    e.respondWith (respuesta);
})