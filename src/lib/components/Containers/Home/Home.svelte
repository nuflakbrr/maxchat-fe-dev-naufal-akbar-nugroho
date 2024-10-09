<script>
	import { FileUser, Plus } from 'lucide-svelte';

	import Heading from '$lib/components/Common/Heading.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	import DataTable from './_components/DataTable.svelte';

	export let data;

	/**
	 * @type {App.Pasien[]}
	 */
	let pasien = data.data;
</script>

<section class="container">
	<!-- TOP SECTION -->
	<div class="flex flex-col justify-between w-full lg:mb-5 md:items-center md:flex-row">
		<Heading className="mb-5 lg:mb-0">
			<FileUser class="mt-1" size={30} slot="icon" />
			<h1 class="text-3xl font-semibold tracking-tight" slot="title">Daftar Pasien</h1>
		</Heading>

		<div class="flex items-center gap-3">
			<Input class="md:w-80" readonly />
			<Button class="flex items-center gap-1">
				<Plus size={18} />
				Tambah
			</Button>
		</div>
	</div>

	<!-- MAIN SECTION -->
	<div>
		{#if pasien?.length > 0}
			<DataTable {pasien} />
		{:else}
			<div class="w-full mx-auto my-80">
				<p class="text-center">Memuat Data 📦...</p>
			</div>
		{/if}
	</div>
</section>
