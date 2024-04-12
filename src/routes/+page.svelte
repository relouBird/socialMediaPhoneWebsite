<script lang="ts">
  import { isConnected } from "../config/connectedVerification";
  import Loading from "../components/common/Loading.svelte";
  import LoadingPost from "../components/common/LoadingPost.svelte";
  import { recoverUid } from "$lib/Data/postCreation";
  import Input from "../components/common/Input.svelte";
  import type { userDataForPostProps } from "$lib/types/userType";
  import { type Writable, writable } from "svelte/store";
  import { getDataUserForPost } from "$lib/Data/getProfileData";
  import Image from "../components/common/Image.svelte";
  import { getAllPost } from "$lib/Data/postRecover";
  import type { postCreationDataProps } from "$lib/types/postType";
  import Post from "../components/homePage/Post.svelte";

  let connect = isConnected();
  let datas: userDataForPostProps = {
    username: "loading...",
    faceUrl: "",
  };

  // ceci sont les variables qui gere la photo de profil
  let imageProfile: Writable<string> = writable("loading");

  // ceci sont les variables qui gerent le username
  let username: string = datas.username;

  let allPost: postCreationDataProps[] = [];

  let uid = "loading";
  async function T() {
    uid = await recoverUid();
    datas = await getDataUserForPost(uid);
    username = datas.username !== "loading..." ? datas.username : "Jet Slide";
    imageProfile.set(datas.faceUrl !== "" ? datas.faceUrl : "");
    allPost = await getAllPost();
  }
  T();
</script>

<svelte:head>
  <title>Home - JetSlide</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

{#if connect}
  <section
    class="w-full relative navbar-effect sm:navbar-effect sm:shadow bg-white overflow-y-scroll"
  >
    
    <div
      class="w-full bg-white z-30 sticky top-0 flex justify-start items-center h-14 px-3 gap-3 shadow-sm"
    >
      {#if $imageProfile !== "loading" && $imageProfile !== ""}
        <Image src={$imageProfile} className="w-8 h-8 sm:h-10 sm:w-10" />
      {:else}
        <Image src={"/user.png"} className="w-10 h-10" />
      {/if}

      <Input placeholder={"what's in your mind " + username} />
    </div>

    <div class="posts w-full h-full">
      {#if allPost.length === 0}
        <LoadingPost />
      {/if}
      {#if allPost.length !== 0}
      {#each allPost as post }
      <Post
      id={post.id}
      uidp={post.uid}
      username={post.nameUser === username ? "Me": post.nameUser}
      userProfile={post.faceUrl}
      time={post.date}
      textPost={post.text}
      imagePost={post.url}
      like={post.like}
      dislike={post.dislike}
      comments={post.comment}
    />
      {/each}
      
      {/if}
    </div>
  </section>
{/if}
