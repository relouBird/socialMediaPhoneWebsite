// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmEAcc0Epd9siAhK7DNE4PJ06lbAKbVX8",
  authDomain: "socialmedia-phone-website.firebaseapp.com",
  projectId: "socialmedia-phone-website",
  storageBucket: "socialmedia-phone-website.appspot.com",
  messagingSenderId: "167458051662",
  appId: "1:167458051662:web:fe0fa0a7d02f1bceb7951f",
  measurementId: "G-SVGLGDWYEZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig)
const analytics = getAnalytics(app);