<script lang="ts">
	import { goto } from '$app/navigation';
	import { FileUser, Plus, Check, X } from 'lucide-svelte';

	import Heading from '$lib/components/Common/Heading.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Dialog from '$lib/components/ui/dialog';

	import DataTable from './_components/DataTable.svelte';

	export let data;

	let pasien: App.PasienList[] = data.data;
	let pasienFiltered: App.PasienList[] = [];

	let searchKtp = data.ktp || '';
	let searchNama = data.nama || '';
	let searchRekamMedis = data.rekam_medis || '';

	let searchPlaceholder = `Cari Nama "${searchNama}", Rekam Medis "${searchRekamMedis}", atau KTP "${searchKtp}"`;

	let inputNama = searchNama || '';
	let inputKtp = searchKtp || '';
	let inputRekamMedis = searchRekamMedis || '';

	function filterPasien(ktp: string, nama: string, rekam_medis: string) {
		pasienFiltered = pasien.filter((item) => {
			return (
				item.ktp.toLowerCase().includes(ktp.toLowerCase()) &&
				item.nama.toLowerCase().includes(nama.toLowerCase()) &&
				item.rekam_medis.toLowerCase().includes(rekam_medis.toLowerCase())
			);
		});
	}

	const handleSubmit = () => {
		if (inputKtp === '' && inputNama === '' && inputRekamMedis === '') {
			return goto('/');
		}

		goto(`/?nama=${inputNama}&ktp=${inputKtp}&rekam_medis=${inputRekamMedis}`);

		filterPasien(inputKtp, inputNama, inputRekamMedis);
	};

	$: filterPasien(searchKtp, searchNama, searchRekamMedis);
</script>

<section class="container">
	<!-- TOP SECTION -->
	<div class="flex flex-col justify-between w-full lg:mb-5 md:items-center md:flex-row">
		<Heading className="mb-5 lg:mb-0">
			<FileUser class="mt-1" size={30} slot="icon" />
			<h1 class="text-3xl font-semibold tracking-tight" slot="title">Daftar Pasien</h1>
		</Heading>

		<div class="flex items-center gap-3">
			<Dialog.Root>
				<Dialog.Trigger>
					<Input class="w-full md:w-80" readonly placeholder={searchPlaceholder} />
				</Dialog.Trigger>

				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title>Pencarian</Dialog.Title>
						<Dialog.Description>
							Isi kolom di bawah ini untuk mencari pasien berdasarkan Nama, Rekam Medis, atau KTP.
						</Dialog.Description>
					</Dialog.Header>

					<div class="grid gap-4 py-4">
						<div class="grid items-center grid-cols-4 gap-4">
							<Label for="nama">Nama</Label>
							<Input id="nama" class="col-span-3" bind:value={inputNama} />
						</div>

						<div class="grid items-center grid-cols-4 gap-4">
							<Label for="ktp">KTP</Label>
							<Input id="ktp" class="col-span-3" bind:value={inputKtp} />
						</div>

						<div class="grid items-center grid-cols-4 gap-4">
							<Label for="rekam_medis">Rekam Medis</Label>
							<Input id="rekam_medis" class="col-span-3" bind:value={inputRekamMedis} />
						</div>
					</div>

					<Dialog.Footer>
						<Button on:click={handleSubmit} class="flex items-center gap-1">
							<Check size={18} />
							Ok
						</Button>

						<Dialog.Close>
							<Button class="flex items-center gap-1" variant="secondary">
								<X size={18} />
								Tutup
							</Button>
						</Dialog.Close>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Root>

			<Button on:click={() => goto('/add')} class="flex items-center gap-1">
				<Plus size={18} />
				Tambah
			</Button>
		</div>
	</div>

	<!-- MAIN SECTION -->
	<div>
		{#if pasienFiltered?.length > 0}
			<DataTable pasien={pasienFiltered} />
		{:else if pasienFiltered?.length === 0 && pasien?.length > 0}
			<DataTable {pasien} />
		{:else}
			<div class="w-full mx-auto my-80">
				<p class="text-center">Memuat Data 📦...</p>
			</div>
		{/if}
	</div>
</section>
