// import des etats de firebase
import { onAuthStateChanged } from "firebase/auth";
import { app, auth, database, storage } from "./firebaseInit";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { DocumentReference, addDoc, collection, updateDoc } from "firebase/firestore";

// importations des routes
import { ROUTES } from "../../config/route";

// autres importations
import { writable, type Writable } from "svelte/store";
import type { user, userDataForPostProps } from "$lib/types/userType";
import type { postCreationDataProps } from "$lib/types/postType";
import { getDataUserForPost } from "./getProfileData";


//variables liées à l'utilisateur
export let uid: Writable<string> = writable("");
export let currentUser: Writable<user| null> = writable(null);
export const file_type: Writable<string | null> = writable(null);
export const downloadUrlImage: Writable<string | null> = writable(null)
export const textPost: Writable<string| null> = writable(null);

// variables liées à l'upload
export const progressEvolve: Writable<number| null> = writable(null);


// fonction qui permet de reinitialiser toutes les données du post 
export const defineNullStoreDatas = () =>{
    uid.set("");
    currentUser.set(null);
    file_type.set(null);
    progressEvolve.set(null);
    downloadUrlImage.set(null);
    textPost.set(null);
}

// permet de recuperer l'uid d'un utilisateur...
// elle est appelé lorsqu'on clique sur le bouton de creation de post
export const recoverUid: ()=> Promise<string>  =  () => {
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
        
// permet de recuperer l' utilisateur actuel...
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





// fonction qui permet de upload l'image si besion se presente
export const  uploading: (file: File) =>Promise<string> =  (file) =>{

    file_type.set(file.type);
    
    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, `posts/${file.name.replace(/ /g,"_")}`);
    
    const uploadTask =  uploadBytesResumable(storageRef, file);
    
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', 
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        progressEvolve.set(Math.round(progress));
        console.log('Upload is ' + progress + '% done');
        
        // ceci permet de gerer l'etat du telechargement c'est à dire de savoir s'il est en pause continue ou est arreté 
        // switch (snapshot.state) {
        //   case 'paused':
        //     console.log('Upload is paused');
        //     break;
        //   case 'running':
        //     console.log('Upload is running');
        //     break;
        // }
      }, 
      (error) => {
        // Handle unsuccessful uploads
        reject(error.message);
      }, 
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then( (downloadURL) => {
             resolve(downloadURL);
          console.log('File available at', downloadURL);
        });
      }
    );
    })
}


// la fonction en elle meme qui recuperera les données et s'occupera de la creation du post
export const postCreation = async (input : string , uid: string, downloadUrlImage: string,fileType: string  ) =>{
  let valid = false
    if(input !== ""){
      // recuperation de l'image et du nom de l'utilisateur
       let userSmallData :userDataForPostProps = await getDataUserForPost(uid);

        // creation de l'objet envoyer pour le post
        let postCreationData : postCreationDataProps = {
            uid: uid,
            nameUser:userSmallData.username,
            faceUrl: userSmallData.faceUrl,
            text: input,
            url: downloadUrlImage,
            fileType: fileType,
            like: 0,
            dislike: 0,
            comment: [""],
            date: new Date().toLocaleString() as string,
        };

        try {
            let userID: string = "";
            const docRef:DocumentReference<postCreationDataProps> | void = await addDoc(collection(database, "posts"), postCreationData).then((res)=>{
             userID = res.id;
            });
            if(docRef){
                await updateDoc(docRef as DocumentReference<postCreationDataProps>,{
                    id: userID
                })
            }
            console.log("data fetch " + postCreationData.uid);
            valid = true
          } catch (error) {
            console.log("Erreur : " + error);
          }
    }
    return valid
}
