<script lang="ts">
  import { onMount } from 'svelte';
  import LoginBox from '../components/logSign/LoginBox.svelte';
  import SubmitButton from '../components/logSign/SubmitButton.svelte';
  import ConnexionInput from '../components/logSign/ConnexionInput.svelte';

</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>


<section class="w-full h-full overflow-hidden">
	<LoginBox onsignup={false} />
	<div class="w-full h-[75%] rounded-tl-[80px] -translate-y-[15%] pt-10 px-8 bg-white z-10">
		<h2 class="text-center font-medium text-blackslow text-2xl">Login</h2>
		<div class="w-full h-[82.5%] flex flex-col justify-between">
			<div class="pt-[14%]">
				<form action="">
					<ConnexionInput name={"Email"} type={'text'} placeholder={"reloubird@gmail.com"} />
					<ConnexionInput name={"Password"} type={'password'} />
					
					<SubmitButton name={'Login'} handleClick={()=>{}} />
				</form>
			</div>
			<div class="fixed min-w-[260px] sm:fixed sm:bottom-12 bottom-16 left-[50%] -translate-x-[50%]">
				<p class="text-center">Don't have any account ? <a href="/sign-up">Sign Up</a></p>
			</div>
		</div>
	</div>
</section>
