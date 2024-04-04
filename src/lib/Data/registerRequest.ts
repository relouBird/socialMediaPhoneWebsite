// importations concernant firebase et firestore
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "@firebase/auth";
import { auth, database } from "./firebaseInit";
import { addDoc, collection } from "firebase/firestore";

// autres importations
import { logValid } from "../../config/connectedVerification";
import type { user, userDataProps } from "$lib/types/userType";

// definition de variables utiles
let userData: userDataProps;

// permet de creer son compte a partir de firebase...
// ////////////////////////////////////////////////
export const createUser = (
  email: string,
  password: string,
  firstname: string,
  lastname: string
) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      var date = new Date().toLocaleDateString();
      userData = {
        FirstName: firstname,
        LastName: lastname,
        Email: email,
        Password: password,
        uid: userCredential.user?.uid,
        ProfilePicture: "",
        Description: "",
        SignupUpdate: `${date}`,
      };

      alert("Sign up successfully");
    })
    .then(async () => {
      try {
        const docRef = await addDoc(collection(database, "users"), userData);
        alert("data fetch " + userData.Email);
      } catch (error) {
        console.log("Erreur : " + error);
      }
      sendEmailVerification(auth.currentUser as user).then((res) => {
        if (typeof window !== "undefined") {
          logValid();
          window.location.assign("/Auth/Email-verification");
        }
      });
    })
    .then(() => {
      //   logValid();
      //   if (typeof window !== "undefined") {
      //     window.location.assign("/");
      //   }
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage + ", De type :" + errorCode);
      // ..
    });
};
