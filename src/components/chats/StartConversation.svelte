<script>
  import { Initialize } from "$lib/ia/initializeGPT";
  import Image from "../common/Image.svelte";

</script>

<div class="w-full h-full flex justify-center items-center">
    <div class=" text-center ">
        <Image src={"/nodata.jpg"} className={"w-48 sm:w-56 sm:h-44 h-40 mx-auto"} notRounded />
        <p class="pb-1.5 text-[13.5px] font-medium text-black/60">Start conversation with a 
            <span class="font-semibold text-black/60">IA</span> now...</p>
        <button on:click={()=>{
            Initialize()
        }} class="text-sm font-medium text-white/80 text-right bg-black/80 px-4 pt-1 pb-2 mr-3 rounded">Start Now</button>
    </div>
</div>