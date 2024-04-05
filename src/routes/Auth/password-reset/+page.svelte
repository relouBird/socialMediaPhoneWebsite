<script lang="ts">
  import LightConnexionInput from "../../../components/logSign/LightConnexionInput.svelte";
  import GlobalVerification from "../../../components/logSign/GlobalVerification.svelte";
  import ButtonAction from "../../../components/logSign/ButtonAction.svelte";
  import BackButton from "../../../components/logSign/BackButton.svelte";
  import { ROUTES } from "../../../config/route";
  import { resetPassword,lookForChange } from "$lib/Data/forgetPassword";

  let data: string = "";
  let optional : string = "";
  $: optional
</script>

<svelte:head>
    <title>Reset Password - JetSlide</title>
</svelte:head>

<section class="w-full h-full flex justify-center items-center">
  <GlobalVerification>
    <div class="w-[85%] z-10 flex flex-col text-white/80 gap-2 h-[80%]">
      <div class="relative">
        <div class="absolute bottom-0.5">
            <BackButton link={ROUTES.login} small />
        </div>
        <p class="text-xl text-center">Forget Password</p>
      </div>
      <p class="text-sm text-white/40">
        Lost your password ? Please enter your email address you will receive a
        link to create new password
      </p>
      <div>
        <LightConnexionInput
        name={"Email"}
        bind:val={data}
        placeholder={"email address..."}
        isPassword={false}
      />
      
      {#if  optional === "* is empty"}
        <p class="text-red-300 text-[12.5px] text-right pb-1.5 pt-0.5 pr-4">* is Empty</p>
      {:else if optional !== "" }
        <p class="text-green-300 text-[12.5px] text-right pb-1.5 pt-0.5 pr-3">{optional}</p>
      {:else}
        <p class="text-transparent text-[12.5px] text-right pb-1.5 pt-0.5 pr-3">*</p>
      {/if}
      </div>
      <div class="-translate-x-2.5 justify-between flex">
        <ButtonAction
          nameBtn={"Request Password Reset"}
          handleClick={() => {
           (
            async function test (){
                optional = await resetPassword(data)
            }
           )()
           data = ""
          }}
        />
      </div>
    </div>
  </GlobalVerification>
</section>
