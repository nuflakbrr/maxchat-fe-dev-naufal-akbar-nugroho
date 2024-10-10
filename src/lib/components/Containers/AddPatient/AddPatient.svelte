<script>
	import { FileUser, Plus, ArrowLeft, Printer, Upload, Check } from 'lucide-svelte';
	import { goto } from '$app/navigation';

	import Heading from '$lib/components/Common/Heading.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Select from '$lib/components/ui/select';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
</script>

<section class="container">
	<!-- TOP SECTION -->
	<Heading className="mb-5 lg:mb-0">
		<FileUser class="mt-1" size={30} slot="icon" />
		<h1 class="text-3xl font-semibold tracking-tight" slot="title">Tambah Pasien</h1>
	</Heading>

	<!-- MAIN SECTION -->
	<form class="w-full mx-auto mt-10">
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
					/>
				</div>
			</div>

			<div class="flex flex-col items-center w-full md:w-1/2 md:flex-row">
				<div class="flex w-full pr-5 lg:justify-end md:w-48">
					<Label for="tanggal_lahir" class="block mb-2 text-sm font-medium text-gray-900">
						Tanggal Lahir
					</Label>
				</div>

				<div class="w-full md:flex-1">
					<Input
						type="date"
						id="tanggal_lahir"
						class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						required
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
					<Select.Root portal={null}>
						<Select.Trigger
							id="provinsi"
							class="text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
						>
							<Select.Value placeholder="Pilih Provinsi" />
						</Select.Trigger>
						<Select.Content>
							<Select.Group>
								<Select.Label>Provinsi</Select.Label>
								<!-- {#each fruits as fruit}
									<Select.Item value={fruit.value} label={fruit.label}>{fruit.label}</Select.Item>
								{/each} -->
							</Select.Group>
						</Select.Content>
						<Select.Input name="provinsi" />
					</Select.Root>
				</div>
			</div>

			<div class="flex flex-col items-center w-full md:w-1/2 md:flex-row">
				<div class="flex w-full pr-5 lg:justify-end md:w-48">
					<Label for="kota" class="block mb-2 text-sm font-medium text-gray-900">Kota/Kab.</Label>
				</div>

				<div class="w-full md:flex-1">
					<Select.Root portal={null}>
						<Select.Trigger
							id="kota"
							class="text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
						>
							<Select.Value placeholder="Pilih Kota/Kab." />
						</Select.Trigger>
						<Select.Content>
							<Select.Group>
								<Select.Label>Kota/Kab.</Select.Label>
								<!-- {#each fruits as fruit}
									<Select.Item value={fruit.value} label={fruit.label}>{fruit.label}</Select.Item>
								{/each} -->
							</Select.Group>
						</Select.Content>
						<Select.Input name="kota" />
					</Select.Root>
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
					<Select.Root portal={null}>
						<Select.Trigger
							id="kecamatan"
							class="text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
						>
							<Select.Value placeholder="Pilih Kecamatan" />
						</Select.Trigger>
						<Select.Content>
							<Select.Group>
								<Select.Label>Kecamatan</Select.Label>
								<!-- {#each fruits as fruit}
									<Select.Item value={fruit.value} label={fruit.label}>{fruit.label}</Select.Item>
								{/each} -->
							</Select.Group>
						</Select.Content>
						<Select.Input name="kecamatan" />
					</Select.Root>
				</div>
			</div>

			<div class="flex flex-col items-center w-full md:w-1/2 md:flex-row">
				<div class="flex w-full pr-5 lg:justify-end md:w-48">
					<Label for="desa" class="block mb-2 text-sm font-medium text-gray-900">Desa</Label>
				</div>

				<div class="w-full md:flex-1">
					<Select.Root portal={null}>
						<Select.Trigger
							id="desa"
							class="text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
						>
							<Select.Value placeholder="Pilih Desa" />
						</Select.Trigger>
						<Select.Content>
							<Select.Group>
								<Select.Label>Desa</Select.Label>
								<!-- {#each fruits as fruit}
									<Select.Item value={fruit.value} label={fruit.label}>{fruit.label}</Select.Item>
								{/each} -->
							</Select.Group>
						</Select.Content>
						<Select.Input name="desa" />
					</Select.Root>
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
				/>
			</div>
		</div>

		<h1 class="my-4 text-xl font-semibold">Alamat Domisili</h1>

		<label class="inline-flex items-center cursor-pointer">
			<span class="mr-20 text-sm font-medium text-gray-900 dark:text-gray-300">
				Sama dengan KTP
			</span>
			<input type="checkbox" value="" class="sr-only peer" />

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
					<Select.Root portal={null}>
						<Select.Trigger
							id="provinsiDomisili"
							class="text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
						>
							<Select.Value placeholder="Pilih Provinsi" />
						</Select.Trigger>
						<Select.Content>
							<Select.Group>
								<Select.Label>Provinsi</Select.Label>
								<!-- {#each fruits as fruit}
									<Select.Item value={fruit.value} label={fruit.label}>{fruit.label}</Select.Item>
								{/each} -->
							</Select.Group>
						</Select.Content>
						<Select.Input name="provinsiDomisili" />
					</Select.Root>
				</div>
			</div>

			<div class="flex flex-col items-center w-full md:w-1/2 md:flex-row">
				<div class="flex w-full pr-5 lg:justify-end md:w-48">
					<Label for="kotaDomisili" class="block mb-2 text-sm font-medium text-gray-900">
						Kota/Kab.
					</Label>
				</div>

				<div class="w-full md:flex-1">
					<Select.Root portal={null}>
						<Select.Trigger
							id="kotaDomisili"
							class="text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
						>
							<Select.Value placeholder="Pilih Kota/Kab." />
						</Select.Trigger>
						<Select.Content>
							<Select.Group>
								<Select.Label>Kota/Kab.</Select.Label>
								<!-- {#each fruits as fruit}
									<Select.Item value={fruit.value} label={fruit.label}>{fruit.label}</Select.Item>
								{/each} -->
							</Select.Group>
						</Select.Content>
						<Select.Input name="kotaDomisili" />
					</Select.Root>
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
					<Select.Root portal={null}>
						<Select.Trigger
							id="kecamatanDomisili"
							class="text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
						>
							<Select.Value placeholder="Pilih Kecamatan" />
						</Select.Trigger>
						<Select.Content>
							<Select.Group>
								<Select.Label>Kecamatan</Select.Label>
								<!-- {#each fruits as fruit}
									<Select.Item value={fruit.value} label={fruit.label}>{fruit.label}</Select.Item>
								{/each} -->
							</Select.Group>
						</Select.Content>
						<Select.Input name="kecamatanDomisili" />
					</Select.Root>
				</div>
			</div>

			<div class="flex flex-col items-center w-full md:w-1/2 md:flex-row">
				<div class="flex w-full pr-5 lg:justify-end md:w-48">
					<Label for="desaDomisili" class="block mb-2 text-sm font-medium text-gray-900">
						Desa
					</Label>
				</div>

				<div class="w-full md:flex-1">
					<Select.Root portal={null}>
						<Select.Trigger
							id="desaDomisili"
							class="text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
						>
							<Select.Value placeholder="Pilih Desa" />
						</Select.Trigger>
						<Select.Content>
							<Select.Group>
								<Select.Label>Desa</Select.Label>
								<!-- {#each fruits as fruit}
									<Select.Item value={fruit.value} label={fruit.label}>{fruit.label}</Select.Item>
								{/each} -->
							</Select.Group>
						</Select.Content>
						<Select.Input name="desaDomisili" />
					</Select.Root>
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
				/>
			</div>
		</div>

		<h1 class="my-4 text-xl font-semibold">Anggota Keluarga Terdekat</h1>

		<div class="flex flex-col items-center justify-center w-1/3 my-4 md:flex-row">
			<div class="flex-none w-full md:w-48">
				<Label for="hubungan" class="block mb-2 text-sm font-medium text-gray-900">Hubungan</Label>
			</div>

			<div class="w-full md:flex-1">
				<Select.Root portal={null}>
					<Select.Trigger
						id="hubungan"
						class="text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
					>
						<Select.Value placeholder="Pilih Hubungan Keluarga" />
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							<Select.Label>Hubungan Keluarga</Select.Label>
							<Select.Item value="ayah" label="Ayah">Ayah</Select.Item>
							<Select.Item value="ibu" label="Ibu">Ibu</Select.Item>
							<Select.Item value="kakak" label="Kakak">Kakak</Select.Item>
							<Select.Item value="adik" label="Adik">Adik</Select.Item>
							<Select.Item value="kakek" label="Kakek">Kakek</Select.Item>
							<Select.Item value="nenek" label="Nenek">Nenek</Select.Item>
							<Select.Item value="sepupu" label="Sepupu">Sepupu</Select.Item>
							<Select.Item value="keponakan" label="Keponakan">Keponakan</Select.Item>
						</Select.Group>
					</Select.Content>
					<Select.Input name="hubungan" />
				</Select.Root>
			</div>
		</div>

		<div class="flex flex-col items-center justify-center my-4 md:flex-row">
			<div class="flex-none w-full md:w-48">
				<Label for="namaKeluarga" class="block mb-2 text-sm font-medium text-gray-900">Nama</Label>
			</div>

			<div class="w-full md:flex-1">
				<Input
					id="namaKeluarga"
					class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					required
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

		<Button class="flex items-center gap-1 mb-2">
			<Plus size={18} />
			Tambah
		</Button>

		<div class="border-b"></div>

		<div class="flex flex-wrap items-center justify-center gap-2 my-2 lg:gap-10">
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
