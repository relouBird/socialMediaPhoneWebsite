<script lang="ts">
  import { ROUTES } from "../../config/route";
  import Image from "../common/Image.svelte";
  import ArrowRight from "../emotes/ArrowRight.svelte";

    export let profileImage : string = ""
    export let username : string = ""
    export let work : string = ""
    export let id: string = ""
</script>

<div class="w-full px-3.5 flex justify-between items-center py-4 shadow rounded">
    <div class="flex items-center justify-start gap-3">
        <Image src={profileImage !=="" ? profileImage: "/user.png"} className={"w-10 h-10"} />
        <div>
            <p class="text-sm font-medium text-black/70">{username}</p>
            <p class="font-medium text-xs text-black/50">{work !== ""? work : "developper"}</p>
        </div>
    </div>
    <a href={`${ROUTES.friends}/${id}`}  class="flex justify-end items-center gap-1 text-blue-400 cursor-pointer p-1">
        <span class="block -translate-y-[2px] hover:underline text-sm">profile</span>
        <ArrowRight size={20} rgbColor={"rgb(96,165,250)"} />
    </a>
</div>