import type { messageDataProps } from "$lib/types/conversationType";
import type { CreateChatCompletionRequestMessage } from "openai/resources/chat/index.mjs";
import { openai } from "./chatgptInit";


export async function Initialize() {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "Bonjour." }],
      model: "gpt-3.5-turbo",
    });
  
    return completion.choices[0].message;
  }


export async function ContinueConversation(listMessage: CreateChatCompletionRequestMessage[]) {
  const completion = await openai.chat.completions.create({
    messages: [...listMessage],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0].message;
}
  
