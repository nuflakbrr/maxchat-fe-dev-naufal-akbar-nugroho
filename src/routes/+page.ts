export const prerender = false;

export async function load({ url, fetch }) {
  // Extract query parameters
  const ktp = url.searchParams.get('ktp') || '';
  const nama = url.searchParams.get('nama') || '';
  const rekam_medis = url.searchParams.get('rekam_medis') || '';

  const res = await fetch(`/api/pasien?ktp=${ktp}&nama=${nama}&rekam_medis=${rekam_medis}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  const data = await res.json();

  if (!Array.isArray(data)) {
    console.error('Expected data to be an array', data);
    return {
      data: [],
      ktp,
      nama,
      rekam_medis
    };
  }

  return {
    data,
    ktp,
    nama,
    rekam_medis
  };
};
