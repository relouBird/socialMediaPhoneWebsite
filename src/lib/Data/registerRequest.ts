// importations concernant firebase et firestore
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "@firebase/auth";
import { auth, database } from "./firebaseInit";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

// autres importations
import { logValid } from "../../config/connectedVerification";
import type { user, userDataProps } from "$lib/types/userType";
import { ROUTES } from "../../config/route";

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
        username: firstname + " " + lastname,
        work: "",
        bio: "",
        Email: email,
        Password: password,
        id: userCredential.user?.uid,
        faceUrl: "",
        coverUrl: "",
        SignupUpdate: `${date}`,
      };

      alert("Sign up successfully");
    })
    .then(async () => {
      try {
        await setDoc(doc(database, "users", `${userData.id}`), userData);
        console.log("data fetch " + userData.Email);
      } catch (error) {
        console.log("Erreur : " + error);
      }
      sendEmailVerification(auth.currentUser as user).then((res) => {
        if (typeof window !== "undefined") {
          logValid(true);
          window.location.assign(ROUTES.verification);
        }
      });
    })
    .then(() => {
      //   logValid();
      //   if (typeof window !== "undefined") {
      //     window.location.assign(ROUTES.home);
      //   }
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage + ", De type :" + errorCode);
      // ..
    });
};
