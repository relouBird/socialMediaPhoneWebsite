<script>
  import "../app.css";
  import Navbar from "../components/navBar/Navbar.svelte";
  import {
    connectedVerification,
    useNavBar,
  } from "../config/connectedVerification";

  connectedVerification();
  if(typeof window !== "undefined"){
    window.addEventListener('popstate',connectedVerification)
  }
  let isNavbar = useNavBar();
</script>

<svelte:head>
  <link rel="icon" href="/icon.png" />
</svelte:head>

<div class="app w-full">
  <main
    class="w-full h-[92vh] overflow-hidden sm:h-screen flex justify-center sm:items-center sm:bg-gray-100"
  >
    <div
      class="w-[100%]  sm:w-[650px] relative h-full sm:overflow-auto sm:h-[95vh] sm:rounded-sm sm:-translate-x-4 bg-white"
    >
      {#if isNavbar}
        <Navbar />
      {/if}
      <slot />
    </div>
  </main>
</div>
