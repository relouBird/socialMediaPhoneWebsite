import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { database, storage } from "./firebaseInit";
import type { profileDataProps } from "$lib/types/postType";
import { doc, getDoc, setDoc } from "firebase/firestore";

// fonction qui permet de upload l'image de fond si besion se presente
export const uploadingCoverProfile: (
  file: File,
  uid: string
) => Promise<string> = (file, uid) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `profiles/${uid}/cover`);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // Handle unsuccessful uploads
        reject(error.message);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        //   console.log("File available at", downloadURL);
        });
      }
    );
  });
};

// fonction qui permet de upload l'image de face si besion se presente
export const uploadingFaceProfile: (
  file: File,
  uid: string
) => Promise<string> = (file, uid) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `profiles/${uid}/face`);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // Handle unsuccessful uploads
        reject(error.message);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        //   console.log("File available at", downloadURL);
        });
      }
    );
  });
};

// la fonction qui permet d'ajouter donc l'image dans le database
export const profileDataAddCoverImage = async (
  uid: string,
  url: string,
  isCover: boolean = false
) => {
  // creation de l'objet envoyer pour le post
  let profileData: profileDataProps = {
    id: "",
    name: "",
    work: "",
    bio: "",
    faceUrl: "",
    coverUrl: "",
  };
  try {
    const docRef = doc(database, "profiles", `${uid}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      if (isCover) {
        profileData = {
          id: docSnap.data().id,
          name: docSnap.data().name,
          work: docSnap.data().work,
          bio: docSnap.data().bio,
          faceUrl: docSnap.data().faceUrl,
          coverUrl: url,
        };
      } else {
        profileData = {
          id: docSnap.data().id,
          name: docSnap.data().name,
          work: docSnap.data().work,
          bio: docSnap.data().bio,
          faceUrl: url,
          coverUrl: docSnap.data().coverUrl,
        };
      }
      await setDoc(doc(database, "profiles", `${uid}`), profileData);
    } else {
      if (isCover) {
        profileData = { ...profileData, coverUrl: url, id: uid };
      } else {
        profileData = { ...profileData, faceUrl: url, id: uid };
      }
    }
    console.log("data fetch " + uid);
  } catch (error) {
    console.log("Erreur : " + error);
  }
};

// la fonction en elle meme qui recuperera les données
export const profileCreation = async (
  uid: string,
  input: string,
  work: string,
  bio: string
) => {
  if (input !== "" || work !== "" || bio !== "") {
    // creation de l'objet envoyer pour le post
    let profileCreationData: profileDataProps = {
      id: uid,
      name: input,
      work: work,
      bio: bio,
      faceUrl: "",
      coverUrl: "",
    };
    try {
      const docRef = doc(database, "profiles", `${uid}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        profileCreationData = {
          ...profileCreationData,
          faceUrl: docSnap.data().faceUrl,
          coverUrl: docSnap.data().coverUrl,
        };
        await setDoc(doc(database, "profiles", `${uid}`), profileCreationData);
      } else {
        await setDoc(
          doc(database, "profiles", `${profileCreationData.id}`),
          profileCreationData
        );
      }

      console.log("data fetch " + profileCreationData.id);
    } catch (error) {
      console.log("Erreur : " + error);
    }
  }
};
