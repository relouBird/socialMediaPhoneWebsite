import { doc, updateDoc } from "firebase/firestore";
import { database } from "./firebaseInit";
import type { conversationDataProps } from "$lib/types/conversationType";
import type { CreateChatCompletionRequestMessage } from "openai/resources/chat/completions.mjs";
import { setDoc } from "firebase/firestore";

// creation de la collection pour creer la conversation
let conversations_collection = "conversations";

// la fonction en elle meme qui recuperera la premiere reponse et creera la conversation
export const createConversation: (
  uid: string,
  firstMessage: CreateChatCompletionRequestMessage
) => Promise<[string, conversationDataProps]> = async (uid, firstMessage) => {
  // creation de l'objet envoyer pour le post
  let conversationCreationData: conversationDataProps = {
    id: uid,
    messages: [firstMessage],
  };

  try {
    const docR = doc(database, conversations_collection, `${uid}`);
    await setDoc(docR, conversationCreationData);

    console.log("data fetch " + conversationCreationData.id);
    return ["true", conversationCreationData];
  } catch (error) {
    console.log("Erreur : " + error);
  }

  return ["false", conversationCreationData];
};


// la fonction en elle meme qui recuperera la premiere reponse et creera la conversation
export const continuousConversation: (
  uid: string,
  messageList: CreateChatCompletionRequestMessage[]
) => void = async (uid, messageList) => {
  // creation de l'objet envoyer pour le post
  let conversationData: conversationDataProps = {
    id: uid,
    messages: [...messageList],
  };

  try {
    const docR = doc(database, conversations_collection, `${uid}`);
    await updateDoc(docR, {
      messages: conversationData.messages
    });

    console.log("data fetch " + conversationData.id);
    // return ["true", conversationData];
  } catch (error) {
    console.log("Erreur : " + error);
  }

  // return ["false", conversationData];
};
