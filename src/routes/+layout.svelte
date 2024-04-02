<script>
	import '../app.css';
</script>

<svelte:head>
	<link rel="icon" href="/icon.png" />
</svelte:head>

<div class="app w-full h-full">

	<main class="w-full h-screen sm:h-screen flex justify-center sm:items-center bg-gray-100">
		<div class="w-[100%] sm:w-[650px] h-full sm:overflow-auto sm:h-[95vh] sm:-translate-x-4 bg-white">
			<slot />
		</div>
	</main>
</div>

