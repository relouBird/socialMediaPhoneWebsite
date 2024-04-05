<script lang="ts">
  import { isConnected } from "../config/connectedVerification";
  import DeconnexionBtn from "../components/homePage/DeconnexionBtn.svelte"

  let connect = isConnected();
</script>

<svelte:head>
  <title>Home - JetSlide</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

{#if connect}
  <section class="w-full h-full sm:h-full sm:shadow bg-white overflow-hidden">
    <div class="w-full h-10 flex pt-8 px-2.5 sm:px-4 justify-between items-center">
      <p class="block pb-1 text-xl font-medium text-black/60">Jet-Slide</p>
      <DeconnexionBtn />
    </div>
  </section>
{/if}
