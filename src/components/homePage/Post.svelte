<script lang="ts">
  import Image from "../common/Image.svelte";
  import OptionsBtn from "./OptionsBtn.svelte";
  import LikeFilled from "../emotes/LikeFilled.svelte";
  import LikeUnfilled from "../emotes/LikeUnfilled.svelte";
  import UnlikeUnfilled from "../emotes/UnlikeUnfilled.svelte";
  import CommentsUnfilled from "../emotes/CommentsUnfilled.svelte";
  import { recoverUid } from "$lib/Data/postCreation";
  import { SearchPostByIdLike, getDataUserForPost, useDislike, useLike } from "$lib/Data/getProfileData";
  import type { userDataForPostProps } from "$lib/types/userType";

  export let id: string = "";
  export let uidp: string = "";
  export let time: string = "";
  export let imagePost: string = "";
  export let textPost: string = "";
  export let like: string[] = [];
  export let dislike: string[] = [];
  export let comments: string[] = [];

  // permet de recuperer l'uid de l'actuel connecté
  let userUid: string = ""

  //les données de celui qui a posté
  let datas : userDataForPostProps;
  
  // permet de recuperer  l'image d'un utilisateur
  let userProfile: string = "";
  let username: string = ""

  // gerer le like
  let likes: string[] = [...like];
  let boolLike: boolean = false;
  if(likes.includes(uidp)){
    boolLike = true
  }
  // gerer le dislike
  let dislikes : string[] = [...dislike];
  let boolDislike: boolean = false;
  if(dislikes.includes(uidp)){
    boolDislike = true
  }

  // gerer le comments
  let boolComments: boolean = false;


  (async () => {
    userUid = await recoverUid()
     datas = await  getDataUserForPost(uidp)
    userProfile = datas.faceUrl
    username = userUid === uidp ? "Me" : datas.username
  })();

  let isImagePost = imagePost !== "" ? "h-[80%]" : "";
</script>

<div class={isImagePost + "w-full pt-3 border-b"}>
  <div class="w-full px-3 flex justify-between items-start">
    <div class="flex justify-start gap-2 items-center">
      <Image src={userProfile!== "" ? userProfile: "/user.png"} className={" w-10 h-10"} />
      <div>
        <p class="text-sm font-medium text-black/90">{username}</p>
        <p class="text-xs text-black/60 pt-1.5">{time}</p>
      </div>
    </div>
    <OptionsBtn />
  </div>
  <div class={imagePost !== "" ? "py-2 px-3" : "py-4 px-3"}>
    <p class="pl-1">{textPost}</p>
  </div>
  {#if imagePost !== ""}
    <div class="w-full h-[70%]">
      <Image
        src={imagePost}
        className="w-full h-full sm:h-[370px]"
        notRounded
      />
    </div>
  {/if}
  <div class="flex w-full h-7 px-3 items-center justify-between">
    <div class="flex items-center justify-start gap-2">
      <div class="bg-blue-400 p-0.5 rounded-full">
        <LikeFilled size={10} rgbColor={"white"} />
      </div>
      <p class="text-xs sm:text-[13px]">{likes.length}</p>
    </div>
    <div class="flex gap-2 items-center justify-end">
      <p class="text-xs sm:text-[13px]">{dislikes.length} dislikes</p>
      <p class="text-[30px] -translate-y-2.5">.</p>
      <p class="text-xs sm:text-[13px]">{comments.length} comments</p>
    </div>
  </div>
  <div
    class="w-full flex px-3 py-1.5 justify-start gap-7 items-center border-t"
  >
    <button
      on:click={() => {
        let dataPost;
        async function name() {
          dataPost = await SearchPostByIdLike(id);
          [boolLike,boolDislike,likes,dislikes] = await useLike(dataPost)
        };
        name()
      }}
      class="flex items-center gap-1 peer"
    >
      <LikeUnfilled
        size={20}
        rgbColor={boolLike ? "rgb(59,130,246)" : "rgba(0,0,0,0.6)"}
      />
      <span
        class={`text-sm -translate-y-0.5 ${boolLike ? "text-blue-500" : "text-[rgba(0,0,0,0.6)]"} `}
        >Like</span
      >
    </button>

    <button
      on:click={() => {
        let dataPost;
        async function name() {
          dataPost = await SearchPostByIdLike(id);
          [boolLike,boolDislike,likes,dislikes] = await useDislike(dataPost)
        };
        name()
      }}
      class="flex items-center gap-1 peer"
    >
      <UnlikeUnfilled
        size={20}
        rgbColor={boolDislike ? "rgb(239,68,68)" : "rgba(0,0,0,0.6)"}
      />
      <span
        class={`text-sm -translate-y-0.5 ${boolDislike ? "text-red-500" : "text-[rgba(0,0,0,0.6)]"} `}
        >Dislike</span
      >
    </button>

    <button on:click={() => {}} class="flex items-center gap-1 peer">
      <CommentsUnfilled size={17} rgbColor="rgba(0,0,0,0.6)" />
      <span class="text-sm -translate-y-0.5 text-[rgba(0,0,0,0.6)]"
        >Comments</span
      >
    </button>
  </div>
</div>
