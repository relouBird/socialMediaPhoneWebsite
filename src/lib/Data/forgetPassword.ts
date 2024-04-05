// importations concernant firebase et firestore
import { onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebaseInit";

// autres importations
import { logValid } from "../../config/connectedVerification";
import { ROUTES } from "../../config/route";


export const lookForChange: () => Promise<string> = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (typeof window !== "undefined"){
          window.location.assign(ROUTES.login)
        }
      } else {
        // User is signed out
      }
    });
  });
};
export const resetPassword = (email: string): Promise<string> => {
  let v: string;

  return new Promise((resolve, reject) => {
    if (email === "") {
      resolve("* is empty");
    } else {
      sendPasswordResetEmail(auth, email)
        .then((userCredential) => {
          // Password reset email sent!
          // ..
          resolve("Password reset email sent!");
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          reject(errorMessage + ", De type :" + errorCode);
        });
    }
  });
};
