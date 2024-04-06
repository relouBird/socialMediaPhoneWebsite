<script lang="ts">
  import type { ChangeEventHandler } from "svelte/elements";
  import { isConnected } from "../config/connectedVerification";

  let connect = isConnected();

  import { writable } from "svelte/store";
  export const imageURL = writable("");

  const  handleFileInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    const inputElement = event.target as HTMLInputElement;
    if (!inputElement.files) return;

    const file = inputElement.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      imageURL.set(url);
    }
  }
</script>

<svelte:head>
  <title>Home - JetSlide</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

{#if connect}
  <section
    class="w-full navbar-effect sm:navbar-effect sm:shadow bg-white overflow-hidden"
  >
    <div
      class="w-full h-10 flex pt-8 px-2.5 sm:px-4 justify-between items-center"
    >
      <script>
      </script>

      <input type="file" on:change={handleFileInput} />
      {#if $imageURL}
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img src={$imageURL} alt="Selected Image" />
      {/if}
    </div>
  </section>
{/if}
