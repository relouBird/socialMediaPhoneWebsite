<script lang="ts">
  import { USER } from "$lib/Data/userData";
  import AddImage from "../../components/posts/AddImage.svelte";
  import Optional from "../../components/posts/Optional.svelte";
  import { isConnected } from "../../config/connectedVerification";
  import {
    defineNullDatasImage,
    file_image,
    imageURL,
  } from "$lib/Data/addImageOnPost";
  import {
    uid,
    downloadUrlImage,
    file_type,
    recoverUid,
    defineNullStoreDatas,
  } from "$lib/Data/postCreation";
  import {
    postCreation,
    progressEvolve,
    uploading,
  } from "$lib/Data/postCreation";
  import CompletePopup from "../../components/common/CompletePopup.svelte";
  import type { userDataForPostProps } from "$lib/types/userType";
  import { getDataUserForPost } from "$lib/Data/getProfileData";

  let connect = isConnected();
  let textareaInput: string = "";
  let validate : boolean= false;
  let userData: userDataForPostProps ={
    username: "",
    faceUrl: ""
  };
  (
    async function T() {
      userData = await getDataUserForPost($uid);
    }
  )()
</script>

<svelte:head>
  <title>Create Your Post - JetSlide</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

{#if connect}
  <section
    class="w-full navbar-effect sm:navbar-effect sm:shadow bg-white overflow-hidden"
  >
    <div
      class="w-full h-12 flex px-2.5 sm:px-4 justify-between items-center border-b-[1.65px] border-b-black/20"
    >
      <p class="block text-[15px] font-medium text-black/70">Create a Post</p>
      <button
        on:click={() => {
          if (typeof $imageURL !== null && $file_image !== null) {
            (async function T() {
              downloadUrlImage.set(await uploading($file_image));
              uid.set(await recoverUid());

              console.log("ça marche en fin :" + $downloadUrlImage);
               postCreation(
                textareaInput,
                $uid,
                $downloadUrlImage ? $downloadUrlImage : "",
                $file_type ? $file_type : ""
              );
            })();
          } else {
            // console.log(textareaInput)
           (async function R() {
            validate = await postCreation(textareaInput, $uid, "", "");
           })()
          }
        }}
        class="block text-[12.5px] sm:text-sm font-medium text-white/70 px-5 pt-1.5 pb-2 rounded bg-black/60"
        >Post
      </button>
    </div>
    <div class="w-full flex justify-between items-center px-3">
      <div class=" flex justify-center gap-1 items-center pt-4">
        <img
          class="w-10 h-10 rounded-full aspect-square object-cover object-center"
          src={userData.faceUrl !== "" ? userData.faceUrl : "/user.png"}
          alt=""
        />
        <div class="pl-3">
          <p class="pl-0.5 text-[15px] text-black/75 font-medium">
            {userData.username}
          </p>
          <Optional name="Public" isPublic />
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
          bind:value={textareaInput}
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
          bind:value={textareaInput}
        ></textarea>
      {/if}
    </div>
    <div class="w-full px-4 pt-5">
      {#if $progressEvolve !== null}
        <p class="text-right text-sm pt-2.5 pr-3 font-medium text-black/70">
          Progression : <span class="text-base font-semibold text-blue-400"
            >{$progressEvolve}%</span
          >
        </p>
      {:else}
        <p></p>
      {/if}
    </div>
    {#if $progressEvolve === 100 || validate === true}
      <CompletePopup
        handleClick={() => {
          progressEvolve.set(null);
          validate = false
          defineNullDatasImage();
          defineNullStoreDatas();
          textareaInput = "";
        }}
      />
    {/if}
  </section>
{/if}
