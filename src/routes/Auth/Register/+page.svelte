<script lang="ts">
  import ConnexionInput from "../../../components/logSign/ConnexionInput.svelte";
  import LoginBox from "../../../components/logSign/LoginBox.svelte";
  import SubmitButton from "../../../components/logSign/SubmitButton.svelte"
  import { registerHardData } from "$lib/Data/hardData";
  import { registerVerification } from "../../../config/registerVerification";
  import { logValid } from "../../../config/connectedVerification";

  type bolLikeThat = boolean[];
  let inputBoxData = registerHardData;

  let registerData: string[] = ["", "", "", "", ""];
  let bins : [boolean,string][] = [] ;
  let affiche : [boolean,string][];
  let container : boolean[]= [];
  let datas : string[] = [];
  $:  affiche = Array.from({ length: inputBoxData.length }, () => [true, ""]);
</script>

<svelte:head>
  <title>Login</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="w-full h-[93%] sm:h-full overflow-hidden">
  <LoginBox onsignup={true} />

  <div
    class="w-full h-[90%] rounded-tl-[80px] -translate-y-[30%] pt-2 px-8 bg-white z-10"
  >
    <div class="w-full h-[92.5%] flex flex-col justify-between">
      <div class="">
        <form action="">
          {#each inputBoxData as data, i}
            <div class="relative py-2">
              <ConnexionInput
                name={data.name}
                placeholder={data.placeholder}
                isPassword={data.isPassword}
                bind:val={registerData[i]}
              />
              {#if affiche[i][0]}
               <p class="absolute"></p>
              {:else}
              <p class="absolute -bottom-4 text-red-400 pl-2 font-medium text-[12.5px]">{affiche[i][1]}</p>
              {/if}
            </div>
          {/each}

          <div class="pt-2.5">
            <SubmitButton name={"Sign Up"} handleClick={() => {
              let confirmPassword = registerData[registerData.length-1] === registerData[registerData.length -2]
              for(let i = 0; i< registerHardData.length-1; i++){
                bins.push(registerVerification(registerHardData[i].name,registerData[i]))
              }
              bins = [...bins, [confirmPassword ,confirmPassword ?"":"re-enter the password"]];
              affiche = bins;
              console.log(affiche)
              for(let i = 0; i< affiche.length-1; i++){
                container.push(affiche[i][0]);
                datas.push(affiche[i][1]);
              }
              if(container.includes(false)){
                console.log('something is wrong')
              } else {
                window.location.assign('/Other')
              }
              logValid();
              bins = [];
            }} />
          </div>
        </form>
      </div>
      <div
        class="fixed min-w-[260px] sm:fixed sm:bottom-[42px] bottom-[58px] left-[50%] -translate-x-[50%]"
      >
        <p class="text-center">
          Already have any account ? <a href="/Auth/Login">Sign In</a>
        </p>
      </div>
    </div>
  </div>
</section>
