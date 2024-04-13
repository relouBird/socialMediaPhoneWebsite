<script lang="ts">
  import type { conversationDataProps } from "$lib/types/conversationType";
  import type { Writable } from "svelte/store";

    export let datas : Writable<[string,conversationDataProps]>

    console.log(datas)
</script>


<div class="w-full h-full ">
    {#each $datas[1].messages as sms }
        <p>{sms.content}</p>
        <p>{sms.role}</p>
    {/each}
</div>