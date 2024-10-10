<script lang="ts">
	import { FileUser, Plus, ArrowLeft, Printer, Upload, Check } from 'lucide-svelte';
	import { goto } from '$app/navigation';

	import Heading from '$lib/components/Common/Heading.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import Input from '$lib/components/ui/input/input.svelte';

	import { region } from './_constant/region';

	let patientData: App.Pasien = {
		nama: '',
		tempat_lahir: '',
		tgl_lahir: '',
		provinsi: '',
		kota: '',
		kecamatan: '',
		desa: '',
		alamat: '',
		hubungan: '',
		nama_keluarga: ''
	};

	let sameAsKTP: boolean = false;

	let oriAlamatDomisili = {
		provinsi: '',
		kota: '',
		kecamatan: '',
		desa: '',
		alamat: ''
	};

	let alamatDomisili = { ...oriAlamatDomisili };

	$: if (sameAsKTP) {
		alamatDomisili = {
			provinsi: patientData.provinsi,
			kota: patientData.kota,
			kecamatan: patientData.kecamatan,
			desa: patientData.desa,
			alamat: patientData.alamat
		};
	} else {
		alamatDomisili = { ...oriAlamatDomisili };
	}

	// @ts-ignore
	$: kotas = patientData.provinsi ? Object.keys(region[patientData.provinsi] || {}) : [];
	$: kecamatans =
		// @ts-ignore
		patientData.provinsi && region[patientData.provinsi] && patientData.kota
			? // @ts-ignore
				Object.keys(region[patientData.provinsi][patientData.kota] || {})
			: [];
	$: desas =
		patientData.kecamatan &&
		// @ts-ignore
		region[patientData.provinsi] &&
		// @ts-ignore
		region[patientData.provinsi][patientData.kota]
			? // @ts-ignore
				Object.values(region[patientData.provinsi][patientData.kota][patientData.kecamatan] || {})
			: [];

	let otherFams = [
		{
			id: 1,
			name: '',
			relation: 'Pilih Hubungan Keluarga'
		},
		{
			id: 2,
			name: '',
			relation: 'Pilih Hubungan Keluarga'
		}
	];

	const addFams = () => {
		otherFams = [
			...otherFams,
			{
				id: otherFams.length + 1,
				name: '',
				relation: 'Pilih Hubungan Keluarga'
			}
		];
	};

	const removeFams = (id: number) => {
		otherFams = otherFams.filter((item) => item.id !== id);
	};

	const handleSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault();

		// reset form
		patientData = {
			nama: '',
			tempat_lahir: '',
			tgl_lahir: '',
			provinsi: '',
			kota: '',
			kecamatan: '',
			desa: '',
			alamat: '',
			hubungan: '',
			nama_keluarga: ''
		};

		alamatDomisili = { ...oriAlamatDomisili };
		sameAsKTP = false;
		otherFams = [
			{
				id: 1,
				name: '',
				relation: 'Pilih Hubungan Keluarga'
			},
			{
				id: 2,
				name: '',
				relation: 'Pilih Hubungan Keluarga'
			}
		];

		// show alert success
		alert('Data berhasil disimpan');
	};
</script>

<section class="container">
	<!-- TOP SECTION -->
	<Heading className="mb-5 lg:mb-0">
		<FileUser class="mt-1" size={30} slot="icon" />
		<h1 class="text-3xl font-semibold tracking-tight" slot="title">Tambah Pasien</h1>
	</Heading>

	<!-- MAIN SECTION -->
	<form class="w-full mx-auto mt-10" on:submit={handleSubmit}>
		<h1 class="mt-4 text-xl font-semibold">Data Utama</h1>

		<div class="flex flex-col items-center justify-center my-4 md:flex-row">
			<div class="flex-none w-full md:w-48">
				<Label for="nama" class="block mb-2 text-sm font-medium text-gray-900">Nama</Label>
			</div>

			<div class="w-full md:flex-1">
				<Input
					id="nama"
					class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					required
					bind:value={patientData.nama}
				/>
			</div>
		</div>

		<div class="flex flex-col items-center w-full gap-4 my-4 md:flex-row">
			<div class="flex flex-col items-center w-full md:w-1/2 md:flex-row">
				<div class="flex-none w-full md:w-48">
					<Label for="tempat_lahir" class="block mb-2 text-sm font-medium text-gray-900">
						Tempat Lahir
					</Label>
				</div>

				<div class="w-full md:flex-1">
					<Input
						id="tempat_lahir"
						class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						required
						bind:value={patientData.tempat_lahir}
					/>
				</div>
			</div>

			<div class="flex flex-col items-center w-full md:w-1/2 md:flex-row">
				<div class="flex w-full pr-5 lg:justify-end md:w-48">
					<Label for="tgl_lahir" class="block mb-2 text-sm font-medium text-gray-900">
						Tanggal Lahir
					</Label>
				</div>

				<div class="w-full md:flex-1">
					<Input
						type="date"
						id="tgl_lahir"
						class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						required
						bind:value={patientData.tgl_lahir}
					/>
				</div>
			</div>
		</div>

		<h1 class="mt-4 text-xl font-semibold">Alamat Sesuai KTP</h1>

		<div class="flex flex-col items-center w-full gap-4 my-4 md:flex-row">
			<div class="flex flex-col items-center w-full md:w-1/2 md:flex-row">
				<div class="flex-none w-full md:w-48">
					<Label for="provinsi" class="block mb-2 text-sm font-medium text-gray-900">
						Provinsi
					</Label>
				</div>

				<div class="w-full md:flex-1">
					<select
						id="provinsi"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						bind:value={patientData.provinsi}
					>
						<option selected disabled>Pilih Provinsi</option>
						{#each Object.keys(region) as provinsi}
							<option>{provinsi}</option>
						{/each}
					</select>
				</div>
			</div>

			<div class="flex flex-col items-center w-full md:w-1/2 md:flex-row">
				<div class="flex w-full pr-5 lg:justify-end md:w-48">
					<Label for="kota" class="block mb-2 text-sm font-medium text-gray-900">Kota/Kab.</Label>
				</div>

				<div class="w-full md:flex-1">
					<select
						id="kota"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						bind:value={patientData.kota}
					>
						<option selected disabled>Pilih Kota/Kab.</option>
						{#each kotas as city}
							<option>{city}</option>
						{/each}
					</select>
				</div>
			</div>
		</div>

		<div class="flex flex-col items-center w-full gap-4 my-4 md:flex-row">
			<div class="flex flex-col items-center w-full md:w-1/2 md:flex-row">
				<div class="flex-none w-full md:w-48">
					<Label for="kecamatan" class="block mb-2 text-sm font-medium text-gray-900">
						Kecamatan
					</Label>
				</div>

				<div class="w-full md:flex-1">
					<select
						id="kecamatan"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						bind:value={patientData.kecamatan}
					>
						<option selected disabled>Pilih Kecamatan</option>
						{#each kecamatans as district}
							<option>{district}</option>
						{/each}
					</select>
				</div>
			</div>

			<div class="flex flex-col items-center w-full md:w-1/2 md:flex-row">
				<div class="flex w-full pr-5 lg:justify-end md:w-48">
					<Label for="desa" class="block mb-2 text-sm font-medium text-gray-900">Desa</Label>
				</div>

				<div class="w-full md:flex-1">
					<select
						id="desa"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						bind:value={patientData.desa}
					>
						<option selected disabled>Pilih Desa</option>
						{#each desas as village}
							<option>{village}</option>
						{/each}
					</select>
				</div>
			</div>
		</div>

		<div class="flex flex-col items-center justify-center my-4 md:flex-row">
			<div class="flex-none w-full md:w-48">
				<Label for="alamat" class="block mb-2 text-sm font-medium text-gray-900">Alamat</Label>
			</div>

			<div class="w-full md:flex-1">
				<Input
					id="alamat"
					class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					required
					bind:value={patientData.alamat}
				/>
			</div>
		</div>

		<h1 class="my-4 text-xl font-semibold">Alamat Domisili</h1>

		<label class="inline-flex items-center cursor-pointer">
			<span class="mr-20 text-sm font-medium text-gray-900 dark:text-gray-300">
				Sama dengan KTP
			</span>

			<input type="checkbox" value="" class="sr-only peer" bind:checked={sameAsKTP} />

			<div
				class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
			></div>
		</label>

		<div class="flex flex-col items-center w-full gap-4 my-4 md:flex-row">
			<div class="flex flex-col items-center w-full md:w-1/2 md:flex-row">
				<div class="flex-none w-full md:w-48">
					<Label for="provinsiDomisili" class="block mb-2 text-sm font-medium text-gray-900">
						Provinsi
					</Label>
				</div>

				<div class="w-full md:flex-1">
					<select
						id="provinsiDomisili"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						bind:value={alamatDomisili.provinsi}
					>
						<option selected disabled>Pilih Provinsi</option>
						{#each Object.keys(region) as provinsi}
							<option>{provinsi}</option>
						{/each}
					</select>
				</div>
			</div>

			<div class="flex flex-col items-center w-full md:w-1/2 md:flex-row">
				<div class="flex w-full pr-5 lg:justify-end md:w-48">
					<Label for="kotaDomisili" class="block mb-2 text-sm font-medium text-gray-900">
						Kota/Kab.
					</Label>
				</div>

				<div class="w-full md:flex-1">
					<select
						id="kotaDomisili"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						bind:value={alamatDomisili.kota}
					>
						<option selected disabled>Pilih Kota/Kab.</option>
						{#each kotas as city}
							<option>{city}</option>
						{/each}
					</select>
				</div>
			</div>
		</div>

		<div class="flex flex-col items-center w-full gap-4 my-4 md:flex-row">
			<div class="flex flex-col items-center w-full md:w-1/2 md:flex-row">
				<div class="flex-none w-full md:w-48">
					<Label for="kecamatanDomisili" class="block mb-2 text-sm font-medium text-gray-900">
						Kecamatan
					</Label>
				</div>

				<div class="w-full md:flex-1">
					<select
						id="kecamatanDomisili"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						bind:value={alamatDomisili.kecamatan}
					>
						<option selected disabled>Pilih Kecamatan</option>
						{#each kecamatans as district}
							<option>{district}</option>
						{/each}
					</select>
				</div>
			</div>

			<div class="flex flex-col items-center w-full md:w-1/2 md:flex-row">
				<div class="flex w-full pr-5 lg:justify-end md:w-48">
					<Label for="desaDomisili" class="block mb-2 text-sm font-medium text-gray-900">
						Desa
					</Label>
				</div>

				<div class="w-full md:flex-1">
					<select
						id="desaDomisili"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						bind:value={alamatDomisili.desa}
					>
						<option selected disabled>Pilih Desa</option>
						{#each desas as village}
							<option>{village}</option>
						{/each}
					</select>
				</div>
			</div>
		</div>

		<div class="flex flex-col items-center justify-center my-4 md:flex-row">
			<div class="flex-none w-full md:w-48">
				<Label for="alamatDomisili" class="block mb-2 text-sm font-medium text-gray-900">
					Alamat
				</Label>
			</div>

			<div class="w-full md:flex-1">
				<Input
					id="alamatDomisili"
					class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					required
					bind:value={alamatDomisili.alamat}
				/>
			</div>
		</div>

		<h1 class="my-4 text-xl font-semibold">Anggota Keluarga Terdekat</h1>

		<div class="flex flex-col items-center justify-center w-1/3 my-4 md:flex-row">
			<div class="flex-none w-full md:w-48">
				<Label for="hubungan" class="block mb-2 text-sm font-medium text-gray-900">Hubungan</Label>
			</div>

			<div class="w-full md:flex-1">
				<select
					id="hubungan"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					bind:value={patientData.hubungan}
				>
					<option selected disabled>Pilih Hubungan Keluarga</option>
					<option>Ayah</option>
					<option>Ibu</option>
					<option>Kakak</option>
					<option>Adik</option>
					<option>Kakek</option>
					<option>Nenek</option>
					<option>Sepupu</option>
					<option>Keponakan</option>
				</select>
			</div>
		</div>

		<div class="flex flex-col items-center justify-center my-4 md:flex-row">
			<div class="flex-none w-full md:w-48">
				<Label for="nama_keluarga" class="block mb-2 text-sm font-medium text-gray-900">Nama</Label>
			</div>

			<div class="w-full md:flex-1">
				<Input
					id="nama_keluarga"
					class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					required
					bind:value={patientData.nama_keluarga}
				/>
			</div>
		</div>

		<h1 class="my-4 text-xl font-semibold">Anggota Keluarga Lainnya</h1>

		<div class="flex w-full gap-2 my-2">
			<div class="flex-none text-center w-14">
				<h1>Urut</h1>
			</div>

			<div class="flex-1 text-center">
				<h1>Nama</h1>
			</div>

			<div class="flex-1 text-center">
				<h1>Hubungan</h1>
			</div>
		</div>

		{#each otherFams as fams}
			<div class="flex w-full gap-2 my-2">
				<div class="flex-none text-center w-14">
					<input
						type="text"
						id="id"
						class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						placeholder="1"
						bind:value={fams.id}
					/>
				</div>
				<div class="flex-1 text-center">
					<input
						type="text"
						id="name"
						class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						placeholder="Family Name"
						bind:value={fams.name}
					/>
				</div>
				<div class="flex-1 text-center">
					<select
						id="relation"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						bind:value={fams.relation}
					>
						<option selected disabled>Choose option...</option>
						<option>Ayah</option>
						<option>Ibu</option>
						<option>Kakak</option>
						<option>Adik</option>
						<option>Kakek</option>
						<option>Nenek</option>
						<option>Sepupu</option>
						<option>Keponakan</option>
					</select>
				</div>
				<div class="flex items-center justify-center mx-4">
					<button on:click={() => removeFams(fams.id)} class="text-sm font-semibold text-gray-600"
						>X</button
					>
				</div>
			</div>
		{/each}

		<Button class="flex items-center gap-1 mb-2" on:click={addFams}>
			<Plus size={18} />
			Tambah
		</Button>

		<div class="border-b"></div>

		<div class="flex flex-wrap items-center justify-center gap-2 my-2">
			<Button
				on:click={() => goto('/')}
				class="flex items-center gap-1 lg:my-2"
				variant="secondary"
			>
				<ArrowLeft size={18} />
				Kembali
			</Button>

			<Button class="flex items-center gap-1 lg:my-2 bg-cyan-500 hover:bg-cyan-600">
				<Printer size={18} />
				Cetak Berkas
			</Button>

			<Button class="flex items-center gap-1 lg:my-2 bg-cyan-500 hover:bg-cyan-600">
				<Upload size={18} />
				Upload Berkas
			</Button>

			<Button type="submit" class="flex items-center gap-1 lg:my-2">
				<Check size={18} />
				Simpan
			</Button>
		</div>
	</form>
</section>
