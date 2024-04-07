<script lang="ts">
  import type { ChangeEventHandler, MouseEventHandler } from "svelte/elements";
  import type { Writable } from "svelte/store";

  export let handleClick : MouseEventHandler<HTMLButtonElement> = ()=>{}
  export let imageWritable : Writable<string>;

  const handleFileInput : ChangeEventHandler<HTMLInputElement> = (event)=>{
    const filesTarget = event.target as HTMLInputElement;
    if(!filesTarget.files) return;
    if(filesTarget){
      const file = filesTarget.files[0]
      if(file){
        const url = URL.createObjectURL(file)
        imageWritable.set(url)
      }
    }
  }
</script>

<button class="" on:click={handleClick}>
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
  <div class="rounded p-0.5 bg-white/40">
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 8C9.832 8 8 9.832 8 12C8 14.168 9.832 16 12 16C14.168 16 16 14.168 16 12C16 9.832 14.168 8 12 8ZM12 14C10.935 14 10 13.065 10 12C10 10.935 10.935 10 12 10C13.065 10 14 10.935 14 12C14 13.065 13.065 14 12 14Z"
        fill="rgba(0,0,0,0.4)"
      />
      <path
        d="M20 5H17.414L14.707 2.293C14.6143 2.19996 14.5041 2.12617 14.3828 2.07589C14.2614 2.0256 14.1313 1.99981 14 2H10C9.86866 1.99981 9.73857 2.0256 9.61724 2.07589C9.4959 2.12617 9.38571 2.19996 9.293 2.293L6.586 5H4C2.897 5 2 5.897 2 7V18C2 19.103 2.897 20 4 20H20C21.103 20 22 19.103 22 18V7C22 5.897 21.103 5 20 5ZM4 18V7H7C7.266 7 7.52 6.895 7.707 6.707L10.414 4H13.586L16.293 6.707C16.3857 6.80004 16.4959 6.87383 16.6172 6.92412C16.7386 6.9744 16.8687 7.00019 17 7H20L20.002 18H4Z"
        fill="rgba(0,0,0,0.4)"
      />
    </svg>
  </div>
</button>
