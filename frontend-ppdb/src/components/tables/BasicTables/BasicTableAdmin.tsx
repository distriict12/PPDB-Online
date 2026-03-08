// src/components/tables/BasicTables/BasicTableAdmin.tsx

// Jalur (path) ../../ di sini SUDAH BENAR
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table"; 

// File ini TIDAK PERLU mengimpor PageBreadcrumb

interface AdminAccount {
  id: number;
  nama: string;
  username: string;
  peran: string;
}

const dataAdmin: AdminAccount[] = [
  { id: 1, nama: "Mohamad Ali", username: "alibaaba", peran: "Admin" },
  { id: 2, nama: "Andre", username: "andreaja", peran: "Admin" },
  { id: 3, nama: "Kepala Sekolah", username: "kelpsek", peran: "Super Admin" },
];

export default function BasicTableAdmin() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Nama
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Username
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Peran
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Aksi
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {dataAdmin.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {admin.nama}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {admin.username}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {admin.peran}
                </TableCell>
                <TableCell className="px-4 py-3 text-start text-theme-sm">
                  <button className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700">
                    Hapus
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}