// importations concernant firebase et firestore
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "./firebaseInit";

// autres importations
import { logValid } from "../../config/connectedVerification";
import { ROUTES } from "../../config/route";

// typages de variables utiles

// definition de variables utiles

// fonction permettant de se connecter a son compte a partir de firebase...
// /////////////////////////////////////
export const connectUser = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      if (userCredential.user.emailVerified) {
        if (typeof window !== "undefined") {
          alert('connexion reussie')
          logValid()
          window.location.assign(ROUTES.home);
        }
      } else {
        if (typeof window !== "undefined") {
          logValid(true)
          window.location.assign(ROUTES.verification);
        }
      }
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("Votre compte n'est pas dans la bd "+ errorCode + "  " + errorMessage);
    });
};
