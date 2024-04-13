import type { CreateChatCompletionRequestMessage } from "openai/resources/chat/index.mjs";

export interface messageDataProps{
    role: string;
    content: string;
}


export interface conversationDataProps{
    id : string;
    messages : CreateChatCompletionRequestMessage[];
}

