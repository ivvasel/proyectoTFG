//Inicializamos Auth Firebase
var firebase = require('firebase');
var firebaseui = require('firebaseui');
var ui = new firebaseui.auth.AuthUI(firebase.auth());

//Correo y pass
ui.start('#firebaseui-auth-container', {
    signInOptions: [{
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
        }       

    ],
    // Other config options
})