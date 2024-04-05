<script>
  import { deconnexion } from "../../config/connectedVerification";
</script>

<button
  class="flex justify-center items-center bg-gray-200 rounded px-2 py-2"
  on:click={() => {
    deconnexion();
  }}
>
  <svg
    width="20"
    height="20"
    class="block mt-0.5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4 6H6V18H4V6ZM14 13H20V11H14V6L8 12L14 18V13Z" fill="rgba(0,0,0,0.8)" />
  </svg>

  <span class="block text-black/80">Deconnexion</span>
</button>
