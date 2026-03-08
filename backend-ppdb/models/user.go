package models

import "time"

// User merepresentasikan skema tabel data akun pengguna (Siswa & Admin) di database
type User struct {
    Id        uint      `json:"id" gorm:"primaryKey"`
    Name      string    `json:"name" gorm:"type:varchar(255)"`
    NISN      string    `json:"nisn" gorm:"unique;not null;type:varchar(20)"`   // Harus unik dan wajib diisi
    NIK       string    `json:"nik" gorm:"unique;not null;type:varchar(20)"`    // Harus unik dan wajib diisi (sesuai Kartu Keluarga)
    Email     string    `json:"email" gorm:"unique;not null;type:varchar(255)"` // Digunakan sebagai identitas utama saat proses login
    Password  string    `json:"password"`                                       // Disimpan secara rahasia dalam format hash bcrypt
    Role      string    `json:"role" gorm:"type:varchar(20);default:'siswa'"`   // Level akses akun, otomatis menjadi 'siswa' jika kosong
    CreatedAt time.Time `json:"created_at"`
    UpdatedAt time.Time `json:"updated_at"` 
}