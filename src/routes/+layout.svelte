<script>
	import '../app.css';
  	import { connectedVerification } from '../config/connectedVerification';

	connectedVerification();
</script>

<svelte:head>
	<link rel="icon" href="/icon.png" />
</svelte:head>

<div class="app w-full">

	<main class="w-full h-screen sm:h-screen flex justify-center sm:items-center sm:bg-gray-100">
		<div class="w-[100%] sm:w-[650px] h-full overflow-hidden  sm:overflow-auto sm:h-[95vh] sm:-translate-x-4 bg-whit">
			<slot />
		</div>
	</main>
</div>

