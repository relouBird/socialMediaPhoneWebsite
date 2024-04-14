// importations necessaire au fonctionnement de gpt
import OpenAI from "openai";
import { config } from "./configure";


const apiKey = config.apiKey;

// configuration de base de chat gpt
const gptConfig = {
    apiKey : apiKey,
    dangerouslyAllowBrowser: true,
    organizationID: "org-I7zcBM8zuxtberNRxA83ngTp",
}

// nom de la clé
    let nameKey: "reloubirdKey"



export const openai = new OpenAI(gptConfig);

