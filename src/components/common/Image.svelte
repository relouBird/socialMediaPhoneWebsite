<script lang="ts">
    export  let className : string = ""
    export let src : string;
    export let notRounded: boolean = false;
</script>

{#if !notRounded}
<img {src} class={className + " rounded-full aspect-square object-cover object-center"} alt="">
{:else}
<img {src} class={className + "  aspect-square object-cover object-center"} alt="">
{/if}

