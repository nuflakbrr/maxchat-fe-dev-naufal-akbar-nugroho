// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface PasienList {
			id: number;
			nama: string;
			rekam_medis: string;
			ktp: string;
			tgl_lahir: string;
			jk: string;
			pendidikan: string;
		}
		interface Pasien {
			nama: string;
			tempat_lahir: string;
			tgl_lahir: string;
			provinsi: string;
			kota: string;
			kecamatan: string;
			desa: string;
			alamat: string;
			hubungan: string;
			nama_keluarga: string;
		}
	}
}

export {};
