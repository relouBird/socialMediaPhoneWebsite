// importations necessaire au fonctionnement de gpt
import OpenAI from "openai";
import { database } from "$lib/Data/firebaseInit";
import { collection, getDocs } from "firebase/firestore";

// const apiKey = config.apiKey;

// variable de collection
let apiKey_collection = "api_key";

export const getAllUsers: () => Promise<apiKeyProps> = async () => {
  let api: apiKeyProps = {
    key: "",
    type: "",
  };
  const docSnap = await getDocs(collection(database, apiKey_collection));
  if (docSnap) {
    docSnap.forEach((doc) => {
      api = doc.data() as apiKeyProps;
    });
    return api;
  } else {
    console.log("no such document");
  }
  return api;
};

// configuration de base de chat gpt
const gptConfig = {
  apiKey: "",
  dangerouslyAllowBrowser: true,
  organizationID: "org-I7zcBM8zuxtberNRxA83ngTp",
};

// nom de la clé
let nameKey: "reloubirdKey";

async function RelouTest() {
  let apiData = await getAllUsers();
  gptConfig.apiKey = apiData.key;
  return new OpenAI(gptConfig);
}
const openai = RelouTest();

export { openai };
