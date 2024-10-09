<script>
	import { FileUser, Plus } from 'lucide-svelte';

	import Heading from '$lib/components/Common/Heading.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	import DataTable from './_components/DataTable.svelte';
</script>

<section class="container">
	<!-- TOP SECTION -->
	<div class="w-full flex items-center justify-between mb-5">
		<Heading>
			<FileUser class="mt-1" size={30} slot="icon" />
			<h1 class="text-3xl font-semibold tracking-tight" slot="title">Daftar Pasien</h1>
		</Heading>

		<div class="flex items-center gap-3">
			<Input placeholder="Cari pasien" />
			<Button class="flex items-center gap-1">
				<Plus size={18} />
				Tambah
			</Button>
		</div>
	</div>

	<!-- MAIN SECTION -->
	<div>
		<DataTable />
	</div>

	<h1 class="underline">HALOOOOOOOOOOOO</h1>
</section>
