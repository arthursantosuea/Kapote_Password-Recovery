// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-analytics.js";
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
const analytics = getAnalytics(app);
const auth = getAuth(app);

const passEnter = prompt("New Password At less 6 characters");
const confirmPass = prompt("Confirm pass");


document.addEventListener('DOMContentLoaded', () => {

    const queryString = window.location.search;
    console.log(queryString);
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
            handleResetPassword(auth, actionCode, continueUrl, lang);

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
    }
}, false);



function handleResetPassword(auth, actionCode, continueUrl, lang) {

    verifyPasswordResetCode(auth, actionCode).then((email) => {
        const accountEmail = email;
        alert(email);
        let inputPassword = passEnter;
        let inputConfirmPassword = confirmPass;
        let newPassword = "senhanaomuda";

        if (inputPassword == inputConfirmPassword) {
            newPassword = inputPassword;
            console.log(newPassword);
        } else {
            console.log("passwords dont match")
        }

        confirmPasswordReset(auth, actionCode, newPassword).then((resp) => {
        }).catch((error) => {
            console.log(error)
        });
    }).catch((error) => {
        console.log(error)
    });
}

