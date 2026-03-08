package structs

import "mime/multipart" 

// RegistrationRequest menangkap dan memvalidasi payload JSON pendaftaran dari Frontend
type RegistrationRequest struct {
    UserId           uint   `json:"user_id" binding:"required"`
    JalurPendaftaran string `json:"jalur_pendaftaran" binding:"required"`
    JurusanUtama     string `json:"jurusan_utama" binding:"required"`
    JurusanCadangan  string `json:"jurusan_cadangan"`
    NamaLengkap      string `json:"nama_lengkap" binding:"required"`
    NISN             string `json:"nisn" binding:"required"`
    TanggalLahir     string `json:"tanggal_lahir" binding:"required"`
    JenisKelamin     string `json:"jenis_kelamin" binding:"required"`
    NoHp             string `json:"no_hp" binding:"required"`
    AsalSekolah      string `json:"asal_sekolah" binding:"required"`
    Alamat           string `json:"alamat" binding:"required"`
}

// RegistrationResponse memformat data pendaftaran agar rapi dan aman saat dikirim balik sebagai balasan
type RegistrationResponse struct {
    Id               uint   `json:"id"`
    UserId           uint   `json:"user_id"`
    JalurPendaftaran string `json:"jalur_pendaftaran"`
    JurusanUtama     string `json:"jurusan_utama"`
    JurusanCadangan  string `json:"jurusan_cadangan"`
    NamaLengkap      string `json:"nama_lengkap"`
    NISN             string `json:"nisn"`
    TanggalLahir     string `json:"tanggal_lahir"`
    JenisKelamin     string `json:"jenis_kelamin"`
    NoHp             string `json:"no_hp"`
    AsalSekolah      string `json:"asal_sekolah"`
    Alamat           string `json:"alamat"`
    Status           string `json:"status"`
    Catatan          string `json:"catatan"`
    KartuKeluarga    string `json:"kartu_keluarga"`
    AktaKelahiran    string `json:"akta_kelahiran"`
    Ijazah           string `json:"ijazah"`
    PasFoto          string `json:"pas_foto"`
    BerkasPendukung  string `json:"berkas_pendukung"`
    CreatedAt        string `json:"created_at"`
    UpdatedAt        string `json:"updated_at"`
}

// UpdateRegistrationRequest menangkap input dari Admin saat mengubah status verifikasi dan memberikan catatan
type UpdateRegistrationRequest struct {
    Status  string `json:"status" binding:"required"`
    Catatan string `json:"catatan"`
}

// CreateRegistrationForm menangani pengiriman gabungan data teks dan unggahan dokumen (multipart/form-data)
type CreateRegistrationForm struct {
    UserId           uint   `form:"user_id" binding:"required"`
    JalurPendaftaran string `form:"jalur_pendaftaran" binding:"required"`
    JurusanUtama     string `form:"jurusan_utama" binding:"required"`
    JurusanCadangan  string `form:"jurusan_cadangan"`
    NamaLengkap      string `form:"nama_lengkap" binding:"required"`
    NISN             string `form:"nisn" binding:"required"`
    TanggalLahir     string `form:"tanggal_lahir" binding:"required"`
    JenisKelamin     string `form:"jenis_kelamin" binding:"required"`
    NoHp             string `form:"no_hp" binding:"required"`
    AsalSekolah      string `form:"asal_sekolah" binding:"required"`
    Alamat           string `form:"alamat" binding:"required"`

    // Menangkap objek file dokumen fisik yang diunggah oleh siswa
    KartuKeluarga   *multipart.FileHeader `form:"kartu_keluarga"`
    AktaKelahiran   *multipart.FileHeader `form:"akta_kelahiran"`
    Ijazah          *multipart.FileHeader `form:"ijazah"`
    PasFoto         *multipart.FileHeader `form:"pas_foto"`
    BerkasPendukung *multipart.FileHeader `form:"berkas_pendukung"`
}