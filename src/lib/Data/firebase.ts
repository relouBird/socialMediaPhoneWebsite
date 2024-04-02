// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// necessaire pour le fonctionnement de firebase
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// autres importations
import { logValid } from "../../config/connectedVerification";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmEAcc0Epd9siAhK7DNE4PJ06lbAKbVX8",
  authDomain: "socialmedia-phone-website.firebaseapp.com",
  projectId: "socialmedia-phone-website",
  storageBucket: "socialmedia-phone-website.appspot.com",
  messagingSenderId: "167458051662",
  appId: "1:167458051662:web:fe0fa0a7d02f1bceb7951f",
  measurementId: "G-SVGLGDWYEZ",
};

export let userD: string[] = [];

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// permet de creer son compte a partir de firebase...
// ////////////////////////////////////////////////
export const createUser = (email: string, password: string, firstname: string, lastname: string) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        var date = new Date().toLocaleDateString();
      const userData = {
        FirstName: firstname,
        LastName : lastname,
        Email: email,
        Password: password,
        uid : userCredential.user?.uid,
        ProfilePicture : "",
        Description : "",
        SignupUpdate : `${date}`
      };
      // userCredential.user?.updateProfile({});
      userD = [email, password, firstname];
      alert("Sign up successfully");
    })
    .then(() => {
      logValid();
      if (typeof window !== "undefined") {
        window.location.assign("/");
      }
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage + "" + errorCode);
      // ..
    });
};

// permet de se connecter a son compte a partir de firebase...
// /////////////////////////////////////
export const connectUser = (email: string, password: string) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("connexion reussie.");
    })
    .then(() => {
      logValid();
      if (typeof window !== "undefined") {
        window.location.assign("/");
      }
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("Votre compte n'est pas dans la bd");
    });
};

//permet de recuperer les donnees de l'utilisateur
// ///////////////////////////////////////
