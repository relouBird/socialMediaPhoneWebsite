<script lang="ts">
  import { deconnexion } from "../config/connectedVerification";

  
</script>

<svelte:head>
  <title>Home - JetSlide</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="w-full h-full sm:h-full overflow-hidden">
  <div>home page</div>
  <button on:click={()=>{
    deconnexion()
  }}>Deconnexion</button>
</section>
