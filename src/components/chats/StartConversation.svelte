<script lang="ts">
  import { createConversation } from "$lib/Data/createConversationByUid";
  import { Initialize } from "$lib/ia/initializeGPT";
  import { writable, type Writable } from "svelte/store";
  import Image from "../common/Image.svelte";
  import type { conversationDataProps } from "$lib/types/conversationType";
  import { recoverUid } from "$lib/Data/postCreation";
  import { getDataUserForPost } from "$lib/Data/getProfileData";

  export let uid : string = ""
  export let data : Writable<[string,conversationDataProps]> = writable(["",{id:"",messages: []}])

  let dats = { username: "user", faceUrl: "" };
  (async () => {
    dats = await getDataUserForPost(await recoverUid());
  })();

</script>

<div class="w-full h-full flex justify-center items-center">
    <div class=" text-center ">
        <Image src={"/nodata.jpg"} className={"w-48 sm:w-56 sm:h-44 h-40 mx-auto"} notRounded />
        <p class="pb-1.5 text-[13.5px] font-medium text-black/60">Start conversation with a 
            <span class="font-semibold text-black/60">IA</span> now...</p>
        <button on:click={()=>{
            let datas;
           ( async ()=>{
            data.set(["",{id:"",messages: []}])
            datas = await Initialize(dats.username)
            data.set(await createConversation(uid,datas))
            console.log(datas)
           })();
        }} class="text-sm font-medium text-white/80 text-right bg-black/80 px-4 pt-1 pb-2 mr-3 rounded">Start Now</button>
    </div>
</div>