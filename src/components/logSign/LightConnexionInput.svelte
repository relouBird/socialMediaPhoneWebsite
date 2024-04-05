<script lang="ts">
  
    export let name: string;
    export let val: string = "";
    export let placeholder: string = "";
    export let isPassword: boolean = false;
  </script>
  
  {#if isPassword}
    <div class="mt-3">
      <p class="pl-2">{name}</p>
      <input
        class="w-full pl-2 pr-2 rounded shadow placeholder:text-black/50 placeholder:text-xl bg-white/30 placeholder:pt-4 mt-1.5 h-10 outline-none"
        type="password"
        placeholder="* * * * * * *"
        bind:value={val}
      />
    </div>
  {:else}
    <div class="mt-1 pr-3">
      <p class="pl-2">{name}</p>
      <input
      type="text"
        class="w-full px-2.5 pb-1 rounded shadow placeholder:text-black/50 mt-1 h-9 bg-white/30 outline-none"
        {placeholder}
        bind:value={val}
      />
    </div>
  {/if}
  