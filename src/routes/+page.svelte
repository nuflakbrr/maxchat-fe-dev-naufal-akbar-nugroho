<script>
	import Home from '$lib/components/Containers/Home/Home.svelte';

	export let data;
</script>

<svelte:head>
	<title>Beranda</title>
	<meta name="description" content="Beranda PT Sabbi - PT Maxchat Test FE" />
</svelte:head>

<Home {data} />
