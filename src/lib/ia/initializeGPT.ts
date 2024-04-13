import { openai } from "./chatgptInit";


export async function Initialize() {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "Bonjour." }],
      model: "gpt-3.5-turbo",
    });
  
    console.log(completion.choices[0]);
  }
  
