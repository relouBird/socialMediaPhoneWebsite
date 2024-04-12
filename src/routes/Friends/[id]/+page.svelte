<script lang="ts">
    import { writable, type Writable } from "svelte/store";
    import { isConnected } from "../../../config/connectedVerification";
    import { recoverUid } from "$lib/Data/postCreation";
    import { profileDataFetch } from "$lib/Data/getProfileData";
    import Loading from "../../../components/common/Loading.svelte";
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
        let tabMode : string[]= [];
        if(window !== undefined){
            let pathRoute: string = window.location.pathname;
            tabMode = pathRoute.split("/");
        }
      datas = await profileDataFetch(tabMode[tabMode.length - 1]);
      username = datas.username !== "loading..." ? datas.username : "Jet Slide";
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
        </div>
      </div>
      <div class="pl-10 pt-5">
        <div
          class={`flex gap-1 items-center ${usernameBool ? "max-sm:flex-col max-sm:items-start max-sm:gap-0" : ""}`}
        >
          
            <p class="text-lg font-medium text-black/70">{username}</p>
        </div>
        <div class="flex items-center gap-0.5">
            <p class="font-medium text-sm text-black/50">
              {work}
            </p>
        </div>

        <div class="mt-8 w-[20%] sm:w-[13%] flex items-center justify-between">
          <p class="font-medium text-black/70 pb-1">About</p>
        </div>
          <p class=" font-medium text-sm text-left pr-[20%] text-black/50">
            {text}
          </p>
      </div>
    </section>
  {/if}
  