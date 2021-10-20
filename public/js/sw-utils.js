

// Guardar  en el cache dinamico
// Inputs (CACHE, REQ , RES(SERVER))
function actualizaCacheDinamico( dynamicCache, req, res ) {

    
    if ( res.ok ) {
        //En caso de recibir respuesta correcta
        return caches.open( dynamicCache ).then( cache => {
            //Escribimos dentro del cache
            cache.put( req, res.clone() );
            //Devolvemos a la app una copia de la respuesta del server
            return res.clone();

        });

    } else {
        //Devolvemos el error que nos responde el server
        return res;
    }

}

// Cache with network update
//Inputs: cache, req. app_sell
function actualizaCacheStatico( staticCache, req, APP_SHELL_INMUTABLE ) {

    //Comprobamos que inmutable no tenga los archivos
    if ( APP_SHELL_INMUTABLE.includes(req.url) ) {
        // No hace falta actualizar el inmutable
        // console.log('existe en inmutable', req.url );

    } else {
        // console.log('actualizando', req.url );
        //Realiza la petición al server y actualiza el cache statico
        return fetch( req )
                .then( res => {
                    return actualizaCacheDinamico( staticCache, req, res );
                });
    }


}
