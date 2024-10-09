// since we are using dynamic data from a fake API, we cannot prerender
export const prerender = false;

export async function load() {
  try {
    const res = await fetch('/api/pasien');
    const data = await res.json();

    return { data };
  } catch {
    return {
      status: 500,
      error: new Error('Failed to fetch data'),
    };
  }
}
