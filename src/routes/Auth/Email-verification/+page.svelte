<script lang="ts">
  import { recoverEmail, resend, verified } from "$lib/Data/emailVerification";
  import LoginBox from "../../../components/logSign/LoginBox.svelte";
  import Verification from "../../../components/logSign/Verification.svelte";

  import { writable } from "svelte/store";
  const state = writable("");
  let email: string;
  let message: string;
  (async function getEmail() {
    try {
      const email = await recoverEmail();
      state.set(email);
    } catch (error) {
      console.log("Error:", error);
    }
  })();
  
  $: email = $state;
</script>

<section class="w-full h-full flex justify-center items-center">
  <!-- <div class="w-[75%] h-[220px] sm:w-[300px] sm:h-[300px] bg-gray-200 rounded shadow shadow-black/10"></div> -->
  <Verification
    {email}
    resend={() => {
      message = resend();
    }}
    confirm={() => {
        (async function T (){
            await verified()
        })()
    }}
    sms={message}
  />
</section>
