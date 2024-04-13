<script lang="ts">
  import { conversationDataFetch } from "$lib/Data/getConversationByUid";
  import { recoverUid } from "$lib/Data/postCreation";
  import type { conversationDataProps } from "$lib/types/conversationType";
  import LoadingPost from "../../components/common/LoadingPost.svelte";
  import StartConversation from "../../components/chats/StartConversation.svelte"
  import { isConnected } from "../../config/connectedVerification";

  let connect = isConnected();

  let uid : string = "";
  let datas : conversationDataProps
  let isCreated: string = "";

  (
    async () =>{
      uid = await recoverUid();
      [isCreated,datas] = await conversationDataFetch(uid);
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
    class="w-full navbar-effect sm:navbar-effect sm:shadow bg-white overflow-hidden"
  >
   {#if isCreated === ""}
    <LoadingPost />
    {:else if isCreated === "false"}
    <StartConversation />
   {/if}

  </section>
{/if}
