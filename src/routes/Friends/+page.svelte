<script lang="ts">
  import { getAllUsers } from "$lib/Data/getAllProfile";
  import type { userDataProps } from "$lib/types/userType";
  import { isConnected } from "../../config/connectedVerification";
  import LoadingPost from "../../components/common/LoadingPost.svelte"
  import ProfileToast from "../../components/friends/ProfileToast.svelte";

  let connect = isConnected();
  let datas: userDataProps[]=  [];

  (async function T(){
    datas = await getAllUsers();
  })();

</script>

<svelte:head>
  <title>Search - JetSlide</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

{#if connect}
  <section class="w-full navbar-effect sm:navbar-effect sm:shadow bg-white overflow-hidden">
    {#if datas.length === 0}
      <LoadingPost />
    {/if}
    {#if datas.length !== 0}
    <div class="px-3 py-3 space-y-2">
      {#each datas as profile }
        <ProfileToast profileImage={profile.faceUrl} id={profile.id} username={profile.username} work={profile.work}  />
    {/each}
    </div>
    {/if}
  </section>
{/if}
