<script>
	import { goto } from '$app/navigation';
	import { FileUser, Plus, Check, X } from 'lucide-svelte';

	import Heading from '$lib/components/Common/Heading.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as Dialog from '$lib/components/ui/dialog';

	import DataTable from './_components/DataTable.svelte';

	export let data;

	// Log the incoming data
	$: console.log(data);

	/**
	 * @type {App.PasienList[]}
	 */
	let pasien = data.data;
	let pasienFiltered = pasien;

	// These will store the query parameters (initial search)
	let searchKtp = data.ktp || '';
	let searchNama = data.nama || '';
	let searchRekamMedis = data.rekam_medis || '';

	// Update placeholder dynamically
	let searchPlaceholder = `Cari Nama "${searchNama}", Rekam Medis "${searchRekamMedis}", atau KTP "${searchKtp}"`;

	// Variables to bind to the dialog input fields for manual search
	let inputNama = searchNama;
	let inputKtp = searchKtp;
	let inputRekamMedis = searchRekamMedis;

	/**
	 * Filter pasien based on the input fields (from dialog or query parameters)
	 * @param {string} ktp
	 * @param {string} nama
	 * @param {string} rekam_medis
	 */
	function filterPasien(ktp, nama, rekam_medis) {
		pasienFiltered = pasien.filter((p) => {
			const lowerQueryKtp = ktp.toLowerCase();
			const lowerQueryNama = nama.toLowerCase();
			const lowerQueryRekamMedis = rekam_medis.toLowerCase();

			return (
				p?.ktp?.toLowerCase().includes(lowerQueryKtp) ||
				p?.nama?.toLowerCase().includes(lowerQueryNama) ||
				p?.rekam_medis?.toLowerCase().includes(lowerQueryRekamMedis)
			);
		});
	}

	// Perform initial filtering based on query params
	$: filterPasien(searchKtp, searchNama, searchRekamMedis);

	// Handle the search button inside the dialog
	function handleDialogSearch() {
		searchNama = inputNama;
		searchKtp = inputKtp;
		searchRekamMedis = inputRekamMedis;
		searchPlaceholder = `Cari Nama "${searchNama}", Rekam Medis "${searchRekamMedis}", atau KTP "${searchKtp}"`;

		// Update the URL with query parameters and redirect to the new URL
		goto(`/?nama=${searchNama}&ktp=${searchKtp}&rekam_medis=${searchRekamMedis}`, {
			replaceState: true
		});

		// Close the dialog and trigger search filtering
		filterPasien(searchKtp, searchNama, searchRekamMedis);
	}
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
						<Button class="flex items-center gap-1" on:click={handleDialogSearch}>
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
		{:else}
			<div class="w-full mx-auto my-80">
				<p class="text-center">Tidak ada data pasien yang ditemukan 📦...</p>
			</div>
		{/if}
	</div>
</section>
