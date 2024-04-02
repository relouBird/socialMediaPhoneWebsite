<script lang="ts">
  import { stringify } from "postcss";

  export let name: string;
  export let val: string = "";
  export let placeholder: string = "";
  export let isPassword: boolean = false;
</script>

{#if isPassword}
  <div class="mt-3">
    <p class="pl-2">{name}</p>
    <input
      class="w-full pl-2 placeholder:text-xl placeholder:pt-4 mt-1.5 h-10 shadow-sm shadow-[#33333330] outline-none"
      type="password"
      placeholder="* * * * * * *"
      bind:value={val}
    />
  </div>
{:else}
  <div class="mt-1">
    <p class="pl-2">{name}</p>
    <input
    type="text"
      class="w-full pl-2 mt-1 h-10 shadow-sm shadow-[#33333330] outline-none"
      {placeholder}
      bind:value={val}
    />
  </div>
{/if}
