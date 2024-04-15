<script lang="ts">
  import type { conversationDataProps } from "$lib/types/conversationType";
  import type { Writable } from "svelte/store";
  import MessageItem from "./MessageItem.svelte";
  import { continuousConversation } from "$lib/Data/createConversationByUid";
  import { recoverUid } from "$lib/Data/postCreation";
  import type { CreateChatCompletionRequestMessage } from "openai/resources/chat/completions.mjs";
  import { discussConversation } from "$lib/ia/initializeGPT";
  import { getDataUserForPost } from "$lib/Data/getProfileData";

  export let datas: Writable<[string, conversationDataProps]>;

  let inputData: string = "";
  let message: CreateChatCompletionRequestMessage;
  let returnMessage: CreateChatCompletionRequestMessage;

  function scrollToBottom() {
    const messagesContainer = document.getElementById('messages-container');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  let dats = { username: "user", faceUrl: "" };
  (async () => {
    dats = await getDataUserForPost(await recoverUid());
  })();
  scrollToBottom();
//   console.log(datas);
</script>

<div id='messages-container' class="w-full navbar-effect h-[90.5%] relative pb-12 bg-gray-50 overflow-y-scroll scroll-smooth">
  {#each $datas[1].messages as sms}
    <MessageItem role={sms.role} content={sms.content ? sms.content : ""} faceUrl={dats.faceUrl} />
  {/each}
</div>

<div class="w-full h-[9.5%] flex justify-between items-center px-5">
  <input
    class="w-[75%] outline-none px-3"
    placeholder="write your message to the bot..."
    bind:value={inputData}
    type="text"
  />
  <button
    on:click={() => {
      if (inputData !== "") {
        message = {
          role: "system",
          content: inputData,
        };
        (async () => {
          let identity = await recoverUid();
          datas.update((item) => {
            return [
              "true",
              {
                id: identity,
                messages: [...$datas[1].messages, message],
              },
            ];
          });
          scrollToBottom();
          await continuousConversation(identity,$datas[1].messages);
          returnMessage = await discussConversation($datas[1].messages);
          datas.update((item) => {
            return [
              "true",
              {
                id: identity,
                messages: [...$datas[1].messages, returnMessage],
              },
            ];
          });
          await continuousConversation(identity,$datas[1].messages);
          scrollToBottom();
          inputData = "";
        })();
      }
    }}
    class="px-5 pt-1 pb-2 rounded bg-black/70 text-sm text-white">Send</button
  >
</div>
