<script lang="ts">
  import { USER } from "$lib/Data/userData";
  import AddImage from "../../components/posts/AddImage.svelte";
  import Optional from "../../components/posts/Optional.svelte";
  import { isConnected } from "../../config/connectedVerification";
  import { imageURL } from "$lib/Data/addImageOnPost";

  let connect = isConnected();
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
      class="w-full h-12 flex px-2.5 sm:px-4 justify-between items-center border-b-[1.65px] border-b-black/20"
    >
      <p class="block text-[15px]">Create a Post</p>
      <button
        class="block text-[12.5px] sm:text-sm font-medium text-black/[0.80]"
        >FOLLOWING</button
      >
    </div>
    <div class="w-full flex justify-between items-center px-3">
      <div class=" flex justify-center gap-1 items-center pt-4">
        <img
          class="w-10 h-10 rounded-full aspect-square object-cover object-center"
          src={USER.profile}
          alt=""
        />
        <div class="pl-3">
          <p class="pl-0.5 text-[15px] text-black/75 font-medium">
            {USER.name}
          </p>
          <Optional />
        </div>
      </div>

      <AddImage />
    </div>
    <div class="px-4 w-full h-[70%] pt-4">
      {#if $imageURL !== null}
        <textarea
          class="w-full h-20 text-[15px] outline-none px-1.5 resize-none"
          placeholder="What's new ?"
          name=""
          id=""
        ></textarea>
        <img
          class="w-full rounded-sm h-[350px] aspect-square object-cover object-center"
          src={$imageURL}
          alt=""
        />
      {:else}
        <textarea
          class="w-full h-full text-[15px] outline-none px-1.5 resize-none"
          placeholder="What's new ?"
          name=""
          id=""
        ></textarea>
      {/if}
    </div>
  </section>
{/if}
