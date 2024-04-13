// importations des types de données
import type { conversationDataProps } from "$lib/types/conversationType";
import { doc, getDoc } from "firebase/firestore";
import { database } from "./firebaseInit";

// creation des collections
let conversation_collection = "conversations"

// fonction qui permet de recuperer les données d'une conversation
export const conversationDataFetch: (uid: string) => Promise<[string,conversationDataProps]> = async (
    uid
  ) => {
    let profileData: conversationDataProps = {
      id: uid,
      messages: []
    };
    try {
      const docRef = doc(database, conversation_collection, `${uid}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        profileData = docSnap.data() as conversationDataProps;
        console.log("Document data:", profileData);
        return ["true",profileData]
      } else {
        console.log("No such document!");
        return ["false",profileData]
      }
    } catch (error) {
      console.log("Error getting document:", error);
    }
    return ["false",profileData];
  };