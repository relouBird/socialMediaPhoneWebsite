<script lang="ts">
  import LoginBox from "../../../components/logSign/LoginBox.svelte";
  import SubmitButton from "../../../components/logSign/SubmitButton.svelte";
  import ConnexionInput from "../../../components/logSign/ConnexionInput.svelte";
  import { loginHardData } from "$lib/Data/hardData";
  import { connectUser } from "$lib/Data/loginRequest";
  import { loginVerification } from "../../../config/loginVerification";
  import { ROUTES } from "../../../config/route";
  import { loader } from "../../../config/loader";

  let inputBoxData = loginHardData;

  let loginData: string[] = ["", "", ""];
  let bins: [boolean, string][] = [];
  let affiche: [boolean, string][];
  $: affiche = Array.from({ length: inputBoxData.length }, () => [true, ""]);
  let datas: string[] = [];
  let container: boolean[] = [];
</script>

<svelte:head>
  <title>Login - JetSlide</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="w-full h-full sm:h-full overflow-hidden">
  <LoginBox onsignup={false} />
  <div
    class="w-full h-[75%] rounded-tl-[80px] -translate-y-[15%] pt-10 px-8 bg-white z-10"
  >
    <h2 class="text-center font-medium text-blackslow text-2xl">Login</h2>
    <div class="w-full h-[82.5%] flex flex-col justify-between">
      <div class="pt-[10%]">
        <form action="">
          {#each inputBoxData as data, i}
            <div class="relative py-1">
              <ConnexionInput
                name={data.name}
                placeholder={data.placeholder}
                isPassword={data.isPassword}
                bind:val={loginData[i]}
              />
              {#if affiche[i][0]}
                <p class="absolute"></p>
              {:else}
                <p
                  class="absolute -bottom-4 text-red-400 pl-2 font-medium text-[12.5px]"
                >
                  {affiche[i][1]}
                </p>
              {/if}
            </div>
          {/each}

          <div class="pt-3 w-full">
            <a href={ROUTES.passwordReset} on:click={()=>{}} class="block text-[13.5px] text-right text-black/80">Forget Password ?</a>
          </div>

          <div class="pt-3.5">
            <SubmitButton
              name={"Login"}
              handleClick={() => {
                for (let i = 0; i < loginHardData.length; i++) {
                  bins.push(
                    loginVerification(loginHardData[i].name, loginData[i])
                  );
                }
                bins = bins;
                affiche = bins;
                for (let i = 0; i < affiche.length; i++) {
                  container.push(affiche[i][0]);
                  datas.push(loginData[i]);
                }
                if (container.includes(false)) {
                  console.log("something is wrong");
                } else {
                  connectUser(datas[0], datas[1]);
                  console.log(datas);
                }
                bins = [];
              }}
            />
          </div>
        </form>
      </div>
      <div
        class="fixed min-w-[260px] sm:fixed sm:bottom-12 bottom-16 left-[50%] -translate-x-[50%]"
      >
        <p class="text-center">
          Don't have any account ? <a class="underline" href={ROUTES.register}
            >Sign Up</a
          >
        </p>
      </div>
    </div>
  </div>
</section>
