<script lang="ts">
  import { conversationDataFetch } from "$lib/Data/getConversationByUid";
  import { recoverUid } from "$lib/Data/postCreation";
  import type { conversationDataProps } from "$lib/types/conversationType";
  import LoadingPost from "../../components/common/LoadingPost.svelte";
  import StartConversation from "../../components/chats/StartConversation.svelte"
  import { isConnected } from "../../config/connectedVerification";
  import { writable, type Writable } from "svelte/store";
  import ConversationDetails from "../../components/chats/ConversationDetails.svelte";

  let connect = isConnected();

  let uid : string = "";
  let allDatas : Writable<[string,conversationDataProps] >= writable(["",{id:"",messages: []}]);
  let datas : conversationDataProps
  let isCreated: string = "";

  (
    async () =>{
      uid = await recoverUid();
      allDatas.set(await conversationDataFetch(uid))  ;
    }
  )();

  // Initialize();
</script>

<svelte:head>
  <title>Home - JetSlide</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

{#if connect}
  <section
    class="w-full h-full navbar-effect sm:navbar-effect sm:shadow bg-white overflow-hidden"
  >
   {#if $allDatas[0] === ""}
    <LoadingPost />
    {:else if $allDatas[0] === "false"}
    <StartConversation uid={uid} data={allDatas} />
    {:else if $allDatas[0] === "true"}
      <ConversationDetails datas={allDatas} />
   {/if}

  </section>
{/if}
