import type { profileDataProps } from "$lib/types/postType";
import { doc, getDoc } from "firebase/firestore";
import { database } from "./firebaseInit";
import type { userDataForPostProps, userDataProps } from "$lib/types/userType";


// creation des noms de collection
let profiles_collection = "profiles"
let users_collection = "users"

// fonction qui permet de recuperer les données
export const profileDataFetch: (uid: string) => Promise<userDataProps> = async (uid) =>{
    let profileData : userDataProps = {
        id: uid,
        username: "",
        work: "",
        bio: "",
        faceUrl: "",
        coverUrl: "",
        Email:"",
        Password:"",
        SignupUpdate:"",

    };
    try {
        const docRef = doc(database, users_collection, `${profileData.id}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            profileData = docSnap.data() as userDataProps;
            console.log("Document data:", profileData);
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.log("Error getting document:", error);
    }
    return profileData;
}

export const getDataUserForPost = async (uid: string) =>{
    let profileData : userDataForPostProps = {
        username: "",
        faceUrl: "",

    };
    try {
        const docRef = doc(database, users_collection, `${uid}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            profileData =  {
                username : docSnap.data().username,
                faceUrl : docSnap.data().faceUrl,
            };
            console.log("Document data:", profileData);
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.log("Error getting document:", error);
    }
    return profileData;
}