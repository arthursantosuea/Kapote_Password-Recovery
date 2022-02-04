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
const errorMessage =document.querySelector(".error-message");
const modal = document.querySelector(".alert-modal");
const wrapperAnimation = document.querySelector(".wrapper")

const button = document.querySelector(".confirm-button");
function activeModal(message){
    errorMessage.innerHTML = message;
    modal.classList.add("active");
    wrapperAnimation.style.animation = "wrapper-smoothing 5s forwards";
    setTimeout(disableModal, 5000);
}
function disableModal(){
    modal.classList.remove("active");
    setTimeout(resetWrapper, 500);


}
function resetWrapper(){
    wrapperAnimation.style.animation = 'wrapper-back';
}

/// Verify Functions
function passwordMatch(pass, confir) {
    if (pass == confir) {
        
        return true;
        
    }

    let errorPasswordMatch = "As senhas são diferentes!";
    activeModal(errorPasswordMatch);
    return false;
}

function lenVerify(pass){
    if (pass.length > 5) return true;
    

    let errorPasswordLength = "Crie uma senha com no mínimo 6 caracteres.";
    activeModal(errorPasswordLength);
    return false;
}


document.addEventListener('DOMContentLoaded', () => {


    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const mode = urlParams.get('mode');
    // Get the one-time code from the query parameter.
    const actionCode = urlParams.get('oobCode');
    // (Optional) Get the continue URL from the query parameter if available.

    switch (mode) {
        case 'resetPassword':
            // Display reset password handler and UI.
            // handleResetPassword(auth, actionCode);
            document.getElementById("resetPassword").style.display = "flex";
            button.addEventListener("click", callHandleResetPassword);
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


    // Função de Handle
    function callHandleResetPassword() {
        handleResetPassword(auth, actionCode);
    }
}, false);


function handleResetPassword(auth, actionCode) {
    verifyPasswordResetCode(auth, actionCode).then(() => {
        let password = inputPassword.value;
        let confirmPassword = inputConfirmPassword.value;
        let newPassword = password;


        if (passwordMatch(password, confirmPassword)) {
            newPassword = password;
            console.log(newPassword);

            if (lenVerify(newPassword)) {

                confirmPasswordReset(auth, actionCode, newPassword).then(() => {
                    document.getElementById("dark").style.display = 'block';
                    document.getElementById("modal").style.display = 'flex';
                }).catch((error) => {
                    console.log(error)
                });
            }
        }
    }).catch((error) => {
        console.log(error)
    });
}
