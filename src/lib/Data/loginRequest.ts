// importations concernant firebase et firestore
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "./firebaseInit";

// autres importations
import { logValid } from "../../config/connectedVerification";

// typages de variables utiles

// definition de variables utiles


// fonction permettant de se connecter a son compte a partir de firebase...
// /////////////////////////////////////
export const connectUser = (email: string, password: string) => {
    signInWithEmailAndPassword(auth ,email, password)
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
  