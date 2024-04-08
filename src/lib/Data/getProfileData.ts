import type { profileDataProps } from "$lib/types/postType";
import { doc, getDoc } from "firebase/firestore";
import { database } from "./firebaseInit";

// fonction qui permet de recuperer les données
export const profileDataFetch: (uid: string) => Promise<profileDataProps> = async (uid) =>{
    let profileData : profileDataProps = {
        id: uid,
        name: "",
        work: "",
        bio: "",
        faceUrl: "",
        coverUrl: "",

    };
    try {
        const docRef = doc(database, "profiles", `${profileData.id}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            profileData = docSnap.data() as profileDataProps;
            console.log("Document data:", profileData);
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.log("Error getting document:", error);
    }
    return profileData;
}