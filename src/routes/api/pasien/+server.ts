export async function GET() {
  const pasien = [
    {
      "id": 1,
      "nama": "Santoso Ibadul Alim",
      "rekam_medis": "1721618463",
      "ktp": "3522062204860003",
      "tgl_lahir": "1998-02-10",
      "jk": "Laki-laki",
      "pendidikan": "SLTA sederajat"
    },
    {
      "id": 2,
      "nama": "Agus Jatmiko",
      "rekam_medis": "1720696038",
      "ktp": "3521061604960003",
      "tgl_lahir": "1993-08-10",
      "jk": "Laki-laki",
      "pendidikan": "SLTA sederajat"
    },
    {
      "id": 3,
      "nama": "Suyati Shinka Amarta",
      "rekam_medis": "1720697007",
      "ktp": "3521062604040003",
      "tgl_lahir": "2001-07-10",
      "jk": "Perempuan",
      "pendidikan": "SLTA sederajat"
    },
    {
      "id": 4,
      "nama": "Winda Kusmiati Aldianti",
      "rekam_medis": "1720697361",
      "ktp": "3519012104890003",
      "tgl_lahir": "2001-07-10",
      "jk": "Perempuan",
      "pendidikan": "SLTA sederajat"
    },
    {
      "id": 5,
      "nama": "Ana Andriani",
      "rekam_medis": "1720697687",
      "ktp": "3519012102890001",
      "tgl_lahir": "2001-07-10",
      "jk": "Perempuan",
      "pendidikan": "SLTA sederajat"
    },
    {
      "id": 6,
      "nama": "Sulaiman Hakam",
      "rekam_medis": "1720697782",
      "ktp": "3519012102890002",
      "tgl_lahir": "2001-07-10",
      "jk": "Laki-laki",
      "pendidikan": "SLTA sederajat"
    },
    {
      "id": 7,
      "nama": "Dadang Sudana",
      "rekam_medis": "1720697834",
      "ktp": "3519012108890001",
      "tgl_lahir": "2001-07-10",
      "jk": "Laki-laki",
      "pendidikan": "SLTA sederajat"
    },
    {
      "id": 8,
      "nama": "Indxra Bachtiar",
      "rekam_medis": "1720697898",
      "ktp": "3529012102890001",
      "tgl_lahir": "2001-07-10",
      "jk": "Laki-laki",
      "pendidikan": "SLTA sederajat"
    },
    {
      "id": 9,
      "nama": "Wardono",
      "rekam_medis": "1720697938",
      "ktp": "3539012104890004",
      "tgl_lahir": "2001-07-10",
      "jk": "Laki-laki",
      "pendidikan": "SLTA sederajat"
    },
    {
      "id": 10,
      "nama": "Lia Sinta",
      "rekam_medis": "1720698102",
      "ktp": "3519012104890001",
      "tgl_lahir": "2001-07-10",
      "jk": "Perempuan",
      "pendidikan": "SLTA sederajat"
    }
  ]

  return new Response(JSON.stringify(pasien), {
      headers: { 'Content-Type': 'application/json' }
  });
}