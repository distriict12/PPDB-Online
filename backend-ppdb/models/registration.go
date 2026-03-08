package models

import "time"

// Registration merepresentasikan skema tabel pendaftaran siswa di database
type Registration struct {
    Id               uint      `json:"id" gorm:"primaryKey"`
    UserId           uint      `json:"user_id" gorm:"unique;not null"` 
    JalurPendaftaran string    `json:"jalur_pendaftaran" gorm:"type:varchar(50);not null"`
    JurusanUtama     string    `json:"jurusan_utama" gorm:"type:varchar(50);not null"`
    JurusanCadangan  string    `json:"jurusan_cadangan" gorm:"type:varchar(50)"`
    NamaLengkap      string    `json:"nama_lengkap" gorm:"type:varchar(255);not null"`
    NISN             string    `json:"nisn" gorm:"type:varchar(20);not null"`
    TanggalLahir     string    `json:"tanggal_lahir" gorm:"type:date;not null"`
    JenisKelamin     string    `json:"jenis_kelamin" gorm:"type:varchar(10);not null"`
    NoHp             string    `json:"no_hp" gorm:"type:varchar(20)"`
    AsalSekolah      string    `json:"asal_sekolah" gorm:"type:varchar(255);not null"`
    Alamat           string    `json:"alamat" gorm:"type:text;not null"`
    KartuKeluarga    string    `json:"kartu_keluarga" gorm:"type:varchar(255)"`
    AktaKelahiran    string    `json:"akta_kelahiran" gorm:"type:varchar(255)"`
    Ijazah           string    `json:"ijazah" gorm:"type:varchar(255)"`
    PasFoto          string    `json:"pas_foto" gorm:"type:varchar(255)"`
    BerkasPendukung  string    `json:"berkas_pendukung" gorm:"type:varchar(255)"` 
    Status           string    `json:"status" gorm:"type:varchar(30);default:'MENUNGGU'"` 
    Catatan          string    `json:"catatan" gorm:"type:text"`
    CreatedAt        time.Time `json:"created_at"`
    UpdatedAt        time.Time `json:"updated_at"`

    // Relasi GORM ke tabel User untuk mempermudah penarikan data JOIN
    User User `json:"user" gorm:"foreignKey:UserId"`
}