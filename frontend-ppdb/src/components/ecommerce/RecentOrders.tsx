import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";

// 1. Interface
interface Pendaftar {
  id: number;
  nama: string;
  jalur: string; // Jalur Pilihan
  asalSekolah: string;
  status: "Terverifikasi" | "Menunggu" | "Ditolak";
  foto: string; // URL atau path ke foto
}

// 2. Data dummy 
const dataPendaftar: Pendaftar[] = [
  {
    id: 1,
    nama: "Mohamad Ali",
    jalur: "Zonasi",
    asalSekolah: "SMPN 1 Tegal",
    status: "Terverifikasi",
    foto: "/images/product/product-01.jpg", // pakai gambar yang ada dulu
  },
  {
    id: 2,
    nama: "Budi Santoso",
    jalur: "Prestasi",
    asalSekolah: "SMPN 2 Brebes",
    status: "Menunggu",
    foto: "/images/product/product-02.jpg",
  },
  {
    id: 3,
    nama: "Citra Lestari",
    jalur: "Afirmasi",
    asalSekolah: "MTs Al-Ikhlas",
    status: "Ditolak",
    foto: "/images/product/product-03.jpg",
  },
  {
    id: 4,
    nama: "Dewi Anggraini",
    jalur: "Zonasi",
    asalSekolah: "SMPN 5 Tegal",
    status: "Menunggu",
    foto: "/images/product/product-04.jpg",
  },
];

export default function RecentOrders() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Pendaftar Terbaru
          </h3>
        </div>

        {/* 3. Tombol Filter dan See All dihapus untuk sementara */}
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* 4. Table Header diubah */}
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Nama Siswa
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Jalur Pilihan
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Asal Sekolah
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* 5. Table Body disesuaikan */}
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {dataPendaftar.map((pendaftar) => (
              <TableRow key={pendaftar.id} className="">
                {/* Kolom Nama Siswa */}
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                      <img
                        src={pendaftar.foto}
                        className="h-[50px] w-[50px]"
                        alt={pendaftar.nama}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {pendaftar.nama}
                      </p>
                    </div>
                  </div>
                </TableCell>
                {/* Kolom Jalur Pilihan */}
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {pendaftar.jalur}
                </TableCell>
                {/* Kolom Asal Sekolah */}
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {pendaftar.asalSekolah}
                </TableCell>
                {/* Kolom Status */}
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      pendaftar.status === "Terverifikasi"
                        ? "success"
                        : pendaftar.status === "Menunggu"
                        ? "warning"
                        : "error"
                    }
                  >
                    {pendaftar.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}