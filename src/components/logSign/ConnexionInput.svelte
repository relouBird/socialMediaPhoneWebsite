<script lang="ts">
  import { stringify } from "postcss";

    export let type : string;
    export let name : string;
    export let placeholder : string = "";
</script>

<div class={`${type === "password" ? "mt-3" : "mt-1"}`}>
    <p class="pl-2">{name}</p>
    <input class={`w-full pl-2 ${type === "password" ? "placeholder:text-xl placeholder:pt-4 mt-1.5" : "mt-1"} h-10  shadow-sm shadow-[#33333330] outline-none`}
     placeholder={type === "password" ? "* * * * * * *" : placeholder} type={type}>
</div>
