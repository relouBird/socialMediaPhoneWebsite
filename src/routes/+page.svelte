<script lang="ts">
  import { isConnected } from "../config/connectedVerification";
  import Loading from "../components/common/Loading.svelte"
  import { recoverUid } from "$lib/Data/postCreation";
  import Input from "../components/common/Input.svelte";
  import type { userDataProps } from "$lib/types/userType";
  import { type Writable, writable } from "svelte/store";
  import { profileDataFetch } from "$lib/Data/getProfileData";
  import Image from "../components/common/Image.svelte";

  let connect = isConnected();
  let datas: userDataProps = {
    id: "loading",
    username: "loading...",
    work: "",
    bio: "",
    faceUrl: "",
    coverUrl: "",
    Email: "",
    Password: "",
    SignupUpdate: "",
  };

  // ceci sont les variables qui gere la photo de profil
  let imageProfile: Writable<string> = writable("loading");

  // ceci sont les variables qui gerent le username
  let username: string = datas.username;

  let uid = "";
  async function T() {
    datas = await profileDataFetch(await recoverUid());
    username = datas.username !== "loading..." ? datas.username : "Jet Slide";
    imageProfile.set(datas.faceUrl !== "" ? datas.faceUrl : "");
  }
  T();
</script>

<svelte:head>
  <title>Home - JetSlide</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

{#if connect}
  <section
    class="w-full navbar-effect sm:navbar-effect sm:shadow bg-white overflow-hidden"
  >
  {#if datas.id === "loading" || $imageProfile === "loading"}
      <Loading />
    {/if}
    <div class="w-full flex justify-start items-center h-14 px-4 gap-3 shadow-sm">
      {#if $imageProfile !== "loading" && $imageProfile !== ""}
      <Image src={$imageProfile} className="w-10 h-10" />
      {:else}
      <Image src={"/user.png"} className="w-10 h-10" />
      {/if}
      
      <Input placeholder={"what's in your mind "+ username} />
    </div>
    <div
      class="w-full h-10 flex pt-8 text-lg font-medium text-black/70 px-2.5 sm:px-4 justify-between items-center"
    >
      Welcome on the Home view.
    </div>
  </section>
{/if}
