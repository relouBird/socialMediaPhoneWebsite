<script>
	import '../app.css';
</script>

<div class="app w-full h-full">

	<main class="w-full h-screen flex justify-center items-center bg-gray-100">
		<div class="w-[100%] sm:w-[430px] h-screen sm:h-[90vh] sm:-translate-x-4 bg-white">
			<!-- <div class="w-full h-16 bg-blue-200"></div> -->
			<slot />
		</div>
	</main>
</div>

