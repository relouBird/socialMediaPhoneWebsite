// import des etats de firebase
import { onAuthStateChanged } from "firebase/auth";
import { app, auth, database } from "./firebaseInit";

// importations des routes
import { ROUTES } from "../../config/route";

// autres importations
import { writable, type Writable } from "svelte/store";
import type { user } from "$lib/types/userType";

//variables liées à l'utilisateur
export let uid: Writable<string> = writable("");
export let currentUser: Writable<user| null> = writable(null);

// permet de recuperer l'uid d'un utilisateur...
// elle est appelé lorsqu'on clique sur le bouton de creation de post
export const recoverUid = async () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (typeof window !== "undefined") {
        if (user) {
          if (user.emailVerified) {
            resolve(user.uid);
          } else {
            window.location.assign(ROUTES.verification);
          }
        } else {
          window.location.assign(ROUTES.login);
        }
      }
    });
  });
};

// permet de recuperer l'uid d'un utilisateur...
// elle est appelé lorsqu'on clique sur le bouton de creation de post
export const recoverCurrentUser = async () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (typeof window !== "undefined") {
        resolve(user)
      }
    });
  });
};
