// importations necessaire au fonctionnement de gpt
import OpenAI from "openai";


// configuration de base de chat gpt
const gptConfig = {
    apiKey : "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",
    dangerouslyAllowBrowser: true,
    organizationID: "org-I7zcBM8zuxtberNRxA83ngTp",
}

// nom de la clé
    let nameKey: "reloubirdKey"



export const openai = new OpenAI(gptConfig);

