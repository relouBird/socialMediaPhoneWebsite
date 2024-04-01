<script lang="ts">
  import ConnexionInput from "../../components/logSign/ConnexionInput.svelte";
  import LoginBox from "../../components/logSign/LoginBox.svelte";
  import SubmitButton from "../../components/logSign/SubmitButton.svelte";

  let registerData: string[] = ["","","","",""]; 

</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="w-full h-[93%] sm:h-full overflow-hidden">
    <LoginBox onsignup={true} />

    <div class="w-full h-[90%] rounded-tl-[80px] -translate-y-[30%] pt-10 px-8 bg-white z-10">
		<div class="w-full h-[92.5%] flex flex-col justify-between">
			<div class="">
				<form action="">
                    <ConnexionInput name={"First name"} placeholder={"murel"} value={registerData[0]} />
                    <ConnexionInput name={"Last name"} placeholder={"ulrich"} value={registerData[1]} />
                    <ConnexionInput name={"Email"} placeholder={"reloubird@gmail.com"} value={registerData[2]} />

					<ConnexionInput name={"Password"} value={registerData[3]} isPassword/>
                    <ConnexionInput name={"Confirm password"} value={registerData[4]} isPassword/>

					<SubmitButton name={'Sign Up'} handleClick={()=>{}} />
				</form>
			</div>
			<div class="fixed min-w-[260px] sm:fixed sm:bottom-[42px] bottom-[58px] left-[50%] -translate-x-[50%]">
				<p class="text-center">Already have any account ? <a href="/">Sign In</a></p>
			</div>
		</div>
</section>
