<script lang="ts">
  import Image from "../common/Image.svelte";

  export let role: string;
  export let content: string;
  export let faceUrl: string;

  let tab: string[] = content.split(" ");
  let content1 = tab.slice(0, 45).join(" ");
</script>

<div
  class={`w-full px-4 py-2 flex ${role === "assistant" ? "" : " flex-row-reverse"}`}
>
  <div
    class={`flex items-start ${role === "assistant" ? "" : " flex-row-reverse"} gap-3`}
  >
    <Image
      src={role === "assistant" ? "/bot.jpg" : faceUrl}
      className={"w-10 h-10"}
    />
    <div
      class=" w-[200px] sm:w-[270px] mt-3 py-3.5 px-3 text-sm text-black/80 bg-gray-200 shadow"
    >
      <p class="">
        {tab.length > 90 ? content1 : content}
        <button on:click={()=>{
            tab = []
        }} class="text-blue-600 underline cursor-pointer"
          >{tab.length > 90 ? "plus..." : ""}</button
        >
      </p>
    </div>
  </div>
</div>
