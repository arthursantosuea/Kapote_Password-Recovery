// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-auth.js";
import { verifyPasswordResetCode, confirmPasswordReset } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBmMbmm6D6xa5ze5ePqOh55UKNu2BxlHDE",
    authDomain: "kapote-ludus.firebaseapp.com",
    databaseURL: "https://kapote-ludus.firebaseio.com",
    projectId: "kapote-ludus",
    storageBucket: "kapote-ludus.appspot.com",
    messagingSenderId: "50302508110",
    appId: "1:50302508110:web:e0a8c896d3b02f5afcf71f",
    measurementId: "G-2XMNQYDXQ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const inputPassword = document.querySelector("#inputPassword");
const inputConfirmPassword = document.querySelector("#confirmPassword");

const button = document.querySelector(".confirm-btn");






/// Verify Functions
function passwordMatch(pass, confir) {
    if (pass == confir) {
        alert("Verificaa são iguais")
        return true;
        
    }
    console.log("passwords dont match")
    return false;
}

function lenVerify(pass){
    if (pass.length >5) {
        alert("Verificada >6")   
        return true;
        
    }

    console.log("Senha menor que 6 digitos");
    return false;
}



///
document.addEventListener('DOMContentLoaded', () => {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const mode = urlParams.get('mode');
    // Get the one-time code from the query parameter.
    const actionCode = urlParams.get('oobCode');
    // (Optional) Get the continue URL from the query parameter if available.
    const continueUrl = urlParams.get('continueUrl');
    // (Optional) Get the language code if available.
    const lang = urlParams.get('lang') || 'en';


    switch (mode) {
        case 'resetPassword':
            // Display reset password handler and UI.
            // handleResetPassword(auth, actionCode);
            button.addEventListener("click", callHandleResetPassword);

            //TODO: CONCERTAR A PORRA DO BOTÃO


            break;
        case 'recoverEmail':
            // Display email recovery handler and UI.
            //handleRecoverEmail(auth, actionCode, lang);
            break;
        case 'verifyEmail':
            // Display email verification handler and UI.
            //handleVerifyEmail(auth, actionCode, continueUrl, lang);
            break;
        default:
            // Error: invalid mode.
            function callHandleResetPassword() {
                handleResetPassword(auth, actionCode);
            }
    }
}, false);


function handleResetPassword(auth, actionCode, continueUrl, lang) {
    verifyPasswordResetCode(auth, actionCode).then((email) => {
        const accountEmail = email;
        let password = inputPassword.value;
        let confirmPassword = inputConfirmPassword.value;
        let newPassword = password;


        if (passwordMatch(password, confirmPassword)) {
            newPassword = password;
            console.log(newPassword);

            // 6 char
            if (lenVerify(newPassword)) {

                confirmPasswordReset(auth, actionCode, newPassword).then((resp) => {
                
                }).catch((error) => {
                    console.log(error)
                });
            }
        }
    }).catch((error) => {
        console.log(error)
    });
}
