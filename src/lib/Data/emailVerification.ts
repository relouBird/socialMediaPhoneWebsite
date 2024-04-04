// importations concernant firebase et firestore
import { auth } from "./firebaseInit";
import { onAuthStateChanged, sendEmailVerification } from "@firebase/auth";

import type { user } from "$lib/types/userType";

const user = auth.currentUser;

// export const recoverEmail : () => string = () =>{
//     let em : string = "t";
//     let t = onAuthStateChanged(auth, (user) => {
//         if (user) {
//           // User is signed in, see docs for a list of available properties
//           // https://firebase.google.com/docs/reference/js/auth.user
//           em = user.email !== null ? user.email : ""
//           // ...
//         }
//       });
//       return em;
// }

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

export const verified: () => Promise<string> = () => {
  return new Promise((res,rej)=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          if (user.emailVerified) {
            if (typeof window !== "undefined") {
              window.location.assign("/");
            }
          } else {
            if (typeof window !== "undefined") {
              window.location.assign("/Auth/Email-verification");
            }
          }
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
  })
};




export const resend =() =>{
    sendEmailVerification(auth.currentUser as user).then((res) => {
      });

    return "we have resend a new verification..."
}
