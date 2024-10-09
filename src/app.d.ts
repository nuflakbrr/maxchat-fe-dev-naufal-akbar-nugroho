// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		interface Pasien {
			id: number;
			nama: string;
			rekam_medis: string;
			ktp: string;
			tgl_lahir: string;
			jk: string;
			pendidikan: string;
		}
	}
}

export {};
