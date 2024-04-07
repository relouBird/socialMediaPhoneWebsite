// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// necessaire pour le fonctionnement de firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// autres importations
import { logValid } from "../../config/connectedVerification";
import { getStorage } from "firebase/storage";

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


export const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export const database = getFirestore(app);
// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage();





