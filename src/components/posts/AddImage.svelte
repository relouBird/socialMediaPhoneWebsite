<script lang="ts">
  import type { ChangeEventHandler, MouseEventHandler } from "svelte/elements";
  import { imageURL } from "$lib/Data/addImageOnPost";

  export let handleClick : MouseEventHandler<HTMLButtonElement> = ()=>{};

  const handleFileInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    const inputElement = event.target as HTMLInputElement;
    if (!inputElement.files) return;

    const file = inputElement.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      imageURL.set(url);
    }
  };
</script>

<button
  class="bg-black/20 block relative pl-2.5 pr-1.5 w-11 h-10 overflow-hidden py-1.5 rounded-sm shadow-sm mr-2"
  on:click={handleClick}
>
  <input
    multiple
    accept="image/*"
    type="file"
    class="text-transparent absolute top-0 left-0 before:absolute rounded-sm before:rounded-sm invisible before:visible before:w-full before:h-full z-10 before:z-10 before:bg-transparent w-full h-full
 cursor-pointer"
    name=""
    id=""
    on:change={handleFileInput}
  />
  <div class="z-10">
    <svg
      width="28"
      height="28"
      class=""
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 5H17V12H19V5C19 3.897 18.103 3 17 3H4C2.897 3 2 3.897 2 5V17C2 18.103 2.897 19 4 19H12V17H4V5Z"
        fill="rgba(0,0,0,0.7)"
      />
      <path d="M8 11L5 15H16L12 9L9 13L8 11Z" fill="rgba(0,0,0,0.7)" />
      <path
        d="M19 14H17V17H14V19H17V22H19V19H22V17H19V14Z"
        fill="rgba(0,0,0,0.7)"
      />
    </svg>
  </div>
</button>
