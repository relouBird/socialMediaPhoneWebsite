<script lang="ts">
    import type { MouseEventHandler } from "svelte/elements";
    export let name : string;
    export let handleClick : MouseEventHandler<HTMLButtonElement>
</script>


<div class="mt-6">
    <button
    on:click|preventDefault={handleClick}
     class="w-full pt-1.5 pb-2.5 text-center text-[16px] text-white rounded-md rounded-tr-none bg-blackslow"
     >{name}
    </button>
</div>