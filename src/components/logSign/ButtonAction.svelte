<script lang="ts">
  import type { MouseEventHandler } from "svelte/elements";

  export let handleClick: MouseEventHandler<HTMLButtonElement>;
  export let nameBtn : string = "";
</script>

<button
  on:click|preventDefault={handleClick}
  class="text-white text-sm px-6 pt-1.5 pb-2.5 scale-90 rounded bg-white/20">{nameBtn}</button
>
