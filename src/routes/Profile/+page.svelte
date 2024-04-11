<script lang="ts">
  import { writable, type Writable } from "svelte/store";
  import ChangeImageBtn from "../../components/common/ChangeImageBtn.svelte";
  import ModificationBtn from "../../components/common/ModificationBtn.svelte";
  import Optional from "../../components/posts/Optional.svelte";
  import { isConnected } from "../../config/connectedVerification";
  import { profileCreation } from "$lib/Data/updateProfileData";
  import { recoverUid, uid } from "$lib/Data/postCreation";
  import { profileDataFetch } from "$lib/Data/getProfileData";
  import type { profileDataProps } from "$lib/types/postType";
  import Loading from "../../components/common/Loading.svelte";
  import type { userDataProps } from "$lib/types/userType";

  let connect = isConnected();

  let datas: userDataProps = {
    id: "loading",
    username: "loading...",
    work: "loading...",
    bio: "loading...",
    faceUrl: "",
    coverUrl: "",
    Email: "",
    Password: "",
    SignupUpdate: "",
  };

  // ceci sont les variables qui gere la photo de profil
  let imageProfile: Writable<string> = writable("loading");

  // ceci sont les variables qui gere la photo de fond
  let imageBackground: Writable<string> = writable("loading");

  // ceci sont les variables qui gerent le metier
  let workBool: boolean = false;
  let work: string = datas.work;

  // ceci sont les variables qui gerent le username
  let usernameBool: boolean = false;
  let username: string = datas.username;

  // Ceci sont les variables qui gerent le about
  let textBool: boolean = false;
  let text: string = datas.bio;

  (async () => {
    datas = await profileDataFetch(await recoverUid());
    username = datas.username !== "loading..." && datas.username !== "" ? datas.username : "Jet Slide";
    work = datas.work !== "loading..." && datas.work !=="" ? datas.work : "developper";
    text =
      datas.bio !== "loading..." && datas.bio !==""
        ? datas.bio
        : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum esse quia unde perspiciatis, cupiditate veniam aliquam dolorum animi vero tenetur natus earum voluptatem ut aperiam temporibus, rerum inventore ab eum?";
    imageProfile.set(datas.faceUrl !== "" ? datas.faceUrl : "");
    imageBackground.set(datas.coverUrl !== "" ? datas.coverUrl : "");
  })();
</script>

<svelte:head>
  <title>Profile - JetSlide</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

{#if connect}
  <section
    class="w-full navbar-effect sm:navbar-effect sm:shadow bg-white overflow-hidden"
  >
    {#if datas.id === "loading" || $imageProfile === "loading" || $imageBackground === "loading"}
      <Loading />
    {/if}
    <div class="pt-1.5 w-full relative h-[55%]">
      <div class="w-full h-full relative">
        {#if $imageBackground !== "loading" && $imageBackground !== ""}
          <img
            src={$imageBackground}
            class="w-full h-full aspect-square object-cover object-center"
            alt=""
          />
        {:else}
          <img
            src="/defaultImage2.png"
            class="w-full scale-[60%] h-full object-cover object-center"
            alt=""
          />
        {/if}
        <div class="absolute right-5 bottom-6 scale-125">
          <ChangeImageBtn imageWritable={imageBackground} isCover />
        </div>
      </div>

      <div
        class={` absolute -bottom-12 right-10 w-28 ${$imageProfile !== "loading" ? " scale-75" : ""} rounded-full bg-white`}
      >
        {#if $imageProfile !== "loading" && $imageProfile !== ""}
          <img
            src={$imageProfile}
            class="w-28 h-auto rounded-full aspect-square object-cover object-center"
            alt=""
          />
        {:else}
          <img
            src="/user.png"
            class="w-28 h-auto scale-[60%] aspect-square object-cover object-center"
            alt=""
          />
        {/if}
        <div class="absolute right-5 bottom-3 scale-100">
          <ChangeImageBtn imageWritable={imageProfile} />
        </div>
      </div>
    </div>
    <div class="pl-10 pt-5">
      <div
        class={`flex gap-1 items-center ${usernameBool ? "max-sm:flex-col max-sm:items-start max-sm:gap-0" : ""}`}
      >
        {#if usernameBool}
          <input
            type="text"
            class=" text-lg sm:w-[25%] w-[40%] text-black/90 font-medium outline-none"
            bind:value={username}
          />
        {:else}
          <p class="text-lg font-medium text-black/70">{username}</p>
        {/if}
        {#if !usernameBool}
          <ModificationBtn
            handleClick={() => {
              usernameBool = true;
            }}
          />
        {:else}
          <Optional
            handleClick={() => {
              (async () => {
                uid.set(await recoverUid());
                profileCreation($uid, username, work, text);
              })();
              usernameBool = false;
            }}
            name={"Confirm "}
          />
        {/if}
      </div>
      <div class="flex items-center gap-0.5">
        {#if workBool}
          <input
            type="text"
            class=" text-sm text-black/80 font-medium outline-none"
            bind:value={work}
          />
        {:else}
          <p class="font-medium text-sm text-black/50">
            {work}
          </p>
        {/if}
        {#if !workBool}
          <div class=" scale-[80%] pt-0.5">
            <ModificationBtn
              handleClick={() => {
                workBool = true;
              }}
            />
          </div>
        {:else}
          <div class="-translate-x-[100%]">
            <Optional
              handleClick={() => {
                (async () => {
                  uid.set(await recoverUid());
                  profileCreation($uid, username, work, text);
                })();
                workBool = false;
              }}
              name={"Confirm "}
            />
          </div>
        {/if}
      </div>
      <div class="mt-8 w-[20%] sm:w-[13%] flex items-center justify-between">
        <p class="font-medium text-black/70 pb-1">About</p>
        {#if !textBool}
          <ModificationBtn
            handleClick={() => {
              textBool = true;
            }}
          />
        {/if}
      </div>
      {#if textBool}
        <textarea
          class="w-[93%] outline-none text-sm font-medium pb-1.5 text-black/80 focus:border-b-2 h-20 resize-none"
          name=""
          bind:value={text}
          id=""
        ></textarea>
        <div class="w-[93%] flex justify-end items-center">
          <Optional
            handleClick={() => {
              (async () => {
                uid.set(await recoverUid());
                profileCreation($uid, username, work, text);
              })();
              textBool = false;
            }}
            name={"Confirm "}
          />
        </div>
      {:else}
        <p class=" font-medium text-sm text-left pr-[20%] text-black/50">
          {text}
        </p>
      {/if}
    </div>
  </section>
{/if}
