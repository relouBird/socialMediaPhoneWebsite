<script lang="ts">
  import type { MouseEventHandler } from "svelte/elements";
  import CloseBtn from "./CloseBtn.svelte";

  export let handleClick: MouseEventHandler<HTMLButtonElement> = () => {};
</script>

<div
  class="w-full h-screen sm:h-full absolute flex justify-center items-center top-0 left-0 bg-black/30"
>
  <div
    class="w-[70%] sm:w-[50%] h-[250px] relative rounded bg-white flex justify-center items-center"
  >
    <CloseBtn {handleClick} />
    <p class="text-center text-blue-400/80 font-medium text-xl">
      Post complete !
    </p>
  </div>
</div>
