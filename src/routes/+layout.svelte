<script>
	import '../app.pcss';

	const year = new Date().getFullYear();
</script>

<div class="app">
	<main class="min-h-screen mx-auto my-5 max-w-7xl">
		<slot />
	</main>

	<footer class="py-3 text-center text-white bg-gray-800">
		&copy; {year} by Naufal Akbar Nugroho
	</footer>
</div>
