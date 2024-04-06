// importations concernant firebase et firestore
import { auth } from "./firebaseInit";
import { onAuthStateChanged, sendEmailVerification } from "@firebase/auth";

// importations des routes
import { ROUTES } from "../../config/route";

// types import
import type { user } from "$lib/types/userType";
import { logValid } from "../../config/connectedVerification";

// definir les variables utiles
const user = auth.currentUser;

export const recoverEmail: () => Promise<string> = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const email = user.email || "";
        resolve(email);
      } else {
        // User is signed out
        reject("User is signed out");
      }
    });
  });
};

// fonction qui permet de verifier si l'utilisateur connecté a verifié son email
export const verified: () => Promise<string> = () => {
  return new Promise((res, rej) => {
    if (typeof window !== "undefined") {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          window.location.reload();
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          if (user.emailVerified) {
            logValid();
            window.location.assign(ROUTES.home);
          } else {
            window.location.assign(ROUTES.verification);
          }
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
    }
  });
};

export const resend = () => {
  sendEmailVerification(auth.currentUser as user).then((res) => {});

  return "we have resend a new verification...";
};
