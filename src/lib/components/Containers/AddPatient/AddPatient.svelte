<script>
	import { FileUser } from 'lucide-svelte';

	import Heading from '$lib/components/Common/Heading.svelte';
</script>

<section class="container">
	<!-- TOP SECTION -->
	<div class="flex flex-col justify-between w-full lg:mb-5 md:items-center md:flex-row">
		<Heading className="mb-5 lg:mb-0">
			<FileUser class="mt-1" size={30} slot="icon" />
			<h1 class="text-3xl font-semibold tracking-tight" slot="title">Tambah Pasien</h1>
		</Heading>
	</div>
</section>
