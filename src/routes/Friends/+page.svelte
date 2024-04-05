<script lang="ts">
  import { isConnected } from "../../config/connectedVerification";

  let connect = isConnected();
</script>

<svelte:head>
  <title>Home - JetSlide</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

{#if connect}
  <section class="w-full navbar-effect sm:navbar-effect sm:shadow bg-white overflow-hidden">
    <div class="w-full h-10 flex pt-8 px-2.5 sm:px-4 justify-between items-center">
      <p>Friends Page</p>
    </div>
  </section>
{/if}
