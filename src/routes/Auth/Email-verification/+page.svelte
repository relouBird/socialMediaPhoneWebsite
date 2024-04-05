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

<svelte:head>
  <title>Email Verification - JetSlide</title>
</svelte:head>

<section class="w-full h-full flex justify-center items-center">
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
