<script>
  import ConnexionInput from "../../components/logSign/ConnexionInput.svelte";
  import LoginBox from "../../components/logSign/LoginBox.svelte";
  import SubmitButton from "../../components/logSign/SubmitButton.svelte";

</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="w-full h-full overflow-hidden">
    <LoginBox onsignup={true} />

    <div class="w-full h-[90%] rounded-tl-[80px] -translate-y-[30%] pt-10 px-8 bg-white z-10">
		<div class="w-full h-[92.5%] flex flex-col justify-between">
			<div class="">
				<form action="">
                    <ConnexionInput name={"First name"} type={'text'} placeholder={"murel"} />
                    <ConnexionInput name={"Last name"} type={'text'} placeholder={"ulrich"} />
                    <ConnexionInput name={"Email"} type={'text'} placeholder={"reloubird@gmail.com"} />

					<ConnexionInput name={"Password"} type={'password'} />
                    <ConnexionInput name={"Confirm password"} type={'password'} />

					<SubmitButton name={'Sign Up'} handleClick={()=>{}} />
				</form>
			</div>
			<div>
				<p class="text-center">Already have any account ? <a href="/">Sign In</a></p>
			</div>
		</div>
</section>
