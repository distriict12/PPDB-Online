package controllers

import (
    "backend-ppdb/database"
    "backend-ppdb/helpers"
    "backend-ppdb/models"
    "backend-ppdb/structs"
    "fmt"
    "mime/multipart"
    "net/http"
    "os"
    "path/filepath"

    "github.com/gin-gonic/gin"
)

// CreateRegistration menangani pengiriman formulir pendaftaran baru beserta upload file
func CreateRegistration(c *gin.Context) {
    // Buat folder 'uploads' jika belum tersedia di server
    uploadDir := "uploads"
    if err := os.MkdirAll(uploadDir, os.ModePerm); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal membuat folder uploads"})
        return
    }

    // Tangkap dan validasi data form-data (teks & file) dari Frontend
    var req structs.CreateRegistrationForm
    if err := c.ShouldBind(&req); err != nil {
        c.JSON(http.StatusUnprocessableEntity, structs.ErrorResponse{
            Success: false,
            Message: "Format data atau file tidak valid",
            Errors:  helpers.TranslateErrorMessage(err),
        })
        return
    }

    // Fungsi pembantu untuk menyimpan file fisik dan mengembalikan path-nya
    saveFile := func(file *multipart.FileHeader, prefix string) string {
        if file == nil {
            return "" // Biarkan kosong jika siswa tidak upload file ini
        }
        
        // Buat nama file unik (prefix_nisn_namafile.pdf) dan simpan fisiknya
        fileName := fmt.Sprintf("%s_%s_%s", prefix, req.NISN, file.Filename)
        filePath := filepath.Join(uploadDir, fileName)

        if err := c.SaveUploadedFile(file, filePath); err != nil {
            fmt.Println("Gagal menyimpan file:", err)
            return ""
        }
        return filePath 
    }

    // Proses penyimpanan kelima file satu per satu (jika dilampirkan)
    pathKK := saveFile(req.KartuKeluarga, "KK")
    pathAkta := saveFile(req.AktaKelahiran, "AKTA")
    pathIjazah := saveFile(req.Ijazah, "IJAZAH")
    pathFoto := saveFile(req.PasFoto, "FOTO")
    pathPendukung := saveFile(req.BerkasPendukung, "PENDUKUNG")

    // Rakit semua data teks dan path file untuk dimasukkan ke database
    registration := models.Registration{
        UserId:           req.UserId,
        JalurPendaftaran: req.JalurPendaftaran,
        JurusanUtama:     req.JurusanUtama,
        JurusanCadangan:  req.JurusanCadangan,
        NamaLengkap:      req.NamaLengkap,
        NISN:             req.NISN,
        TanggalLahir:     req.TanggalLahir,
        JenisKelamin:     req.JenisKelamin,
        NoHp:             req.NoHp,
        AsalSekolah:      req.AsalSekolah,
        Alamat:           req.Alamat,
        KartuKeluarga:    pathKK,
        AktaKelahiran:    pathAkta,
        Ijazah:           pathIjazah,
        PasFoto:          pathFoto,
        BerkasPendukung:  pathPendukung,
        Status:           "MENUNGGU",
    }

    // Simpan seluruh data ke database
    if err := database.DB.Create(&registration).Error; err != nil {
        c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
            Success: false,
            Message: "Gagal menyimpan formulir. User mungkin sudah mendaftar.",
            Errors:  helpers.TranslateErrorMessage(err),
        })
        return
    }

    // Kirim respon sukses ke Frontend
    c.JSON(http.StatusCreated, structs.SuccessResponse{
        Success: true,
        Message: "Pendaftaran dan Upload File berhasil!",
    })
}

// FindRegistrations mengambil seluruh data pendaftar untuk Dashboard Admin
func FindRegistrations(c *gin.Context) {
    // Siapkan penampung data dari database
    var registrations []models.Registration

    if err := database.DB.Find(&registrations).Error; err != nil {
        c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
            Success: false,
            Message: "Failed to fetch registrations",
            Errors:  helpers.TranslateErrorMessage(err),
        })
        return
    }

    // Siapkan array respon default kosong agar tidak mereturn 'null' jika belum ada pendaftar
    responses := []structs.RegistrationResponse{}

    // Mapping data mentah dari database ke format respon yang rapi
    for _, reg := range registrations {
        responses = append(responses, structs.RegistrationResponse{
            Id:               reg.Id,
            UserId:           reg.UserId,
            JalurPendaftaran: reg.JalurPendaftaran,
            JurusanUtama:     reg.JurusanUtama,
            JurusanCadangan:  reg.JurusanCadangan,
            NamaLengkap:      reg.NamaLengkap,
            NISN:             reg.NISN,
            TanggalLahir:     reg.TanggalLahir,
            JenisKelamin:     reg.JenisKelamin,
            NoHp:             reg.NoHp,
            AsalSekolah:      reg.AsalSekolah,
            Alamat:           reg.Alamat,
            Status:           reg.Status,
            Catatan:          reg.Catatan,
            KartuKeluarga:    reg.KartuKeluarga,
            AktaKelahiran:    reg.AktaKelahiran,
            Ijazah:           reg.Ijazah,
            PasFoto:          reg.PasFoto,
            BerkasPendukung:  reg.BerkasPendukung,
            CreatedAt:        reg.CreatedAt.String(),
            UpdatedAt:        reg.UpdatedAt.String(),
        })
    }

    c.JSON(http.StatusOK, structs.SuccessResponse{
        Success: true,
        Message: "List Data Registrations",
        Data:    responses,
    })
}

// UpdateRegistration menangani perubahan status dan catatan verifikasi oleh Admin
func UpdateRegistration(c *gin.Context) {
    id := c.Param("id")
    var registration models.Registration

    // Pastikan data pendaftar ditemukan berdasarkan ID
    if err := database.DB.Where("id = ?", id).First(&registration).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Pendaftar tidak ditemukan"})
        return
    }

    // Tangkap JSON status dan catatan dari Frontend
    var input struct {
        Status  string `json:"status"`
        Catatan string `json:"catatan"`
    }

    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // Timpa status pendaftar dengan status baru
    if input.Status != "" {
        registration.Status = input.Status
    }

    // Bersihkan catatan jika lulus/terverifikasi, atau simpan catatan baru jika ada perbaikan/ditolak
    if input.Status == "TERVERIFIKASI" || input.Status == "LULUS" {
        registration.Catatan = ""
    } else if input.Catatan != "" {
        registration.Catatan = input.Catatan
    }

    // Simpan perubahan ke database
    if err := database.DB.Save(&registration).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal update"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": registration})
}

// DeleteRegistration menghapus data pendaftar secara permanen (Tombol Merah Admin)
func DeleteRegistration(c *gin.Context) {
    id := c.Param("id")
    var registration models.Registration

    // Pastikan datanya ada sebelum dihapus
    if err := database.DB.First(&registration, id).Error; err != nil {
        c.JSON(http.StatusNotFound, structs.ErrorResponse{
            Success: false,
            Message: "Data Pendaftar tidak ditemukan",
            Errors:  helpers.TranslateErrorMessage(err),
        })
        return
    }

    // Hapus data dari database
    if err := database.DB.Delete(&registration).Error; err != nil {
        c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
            Success: false,
            Message: "Gagal menghapus data",
            Errors:  helpers.TranslateErrorMessage(err),
        })
        return
    }

    c.JSON(http.StatusOK, structs.SuccessResponse{
        Success: true,
        Message: "Data pendaftar berhasil dihapus permanen",
    })
}

// ResubmitRegistration menangani perbaikan data formulir oleh Siswa
func ResubmitRegistration(c *gin.Context) {
    uploadDir := "uploads"

    // Tangkap data revisi dari form-data
    var req structs.CreateRegistrationForm
    if err := c.ShouldBind(&req); err != nil {
        c.JSON(http.StatusUnprocessableEntity, gin.H{"error": "Format data tidak valid"})
        return
    }

    // Cari formulir lama milik siswa berdasarkan user_id
    var registration models.Registration
    if err := database.DB.Where("user_id = ?", req.UserId).First(&registration).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Data pendaftaran tidak ditemukan!"})
        return
    }

    // Timpa seluruh data teks dengan inputan terbaru dan kembalikan status ke MENUNGGU
    registration.JalurPendaftaran = req.JalurPendaftaran
    registration.JurusanUtama = req.JurusanUtama
    registration.JurusanCadangan = req.JurusanCadangan
    registration.NamaLengkap = req.NamaLengkap
    registration.NISN = req.NISN
    registration.TanggalLahir = req.TanggalLahir
    registration.JenisKelamin = req.JenisKelamin
    registration.NoHp = req.NoHp
    registration.AsalSekolah = req.AsalSekolah
    registration.Alamat = req.Alamat
    registration.Status = "MENUNGGU"

    // Fungsi pintar: Simpan file baru jika diupload, atau pertahankan file lama jika dibiarkan kosong
    updateFile := func(file *multipart.FileHeader, prefix string, oldPath string) string {
        if file == nil {
            return oldPath 
        }
        fileName := fmt.Sprintf("%s_%s_%s", prefix, req.NISN, file.Filename)
        filePath := filepath.Join(uploadDir, fileName)
        if err := c.SaveUploadedFile(file, filePath); err != nil {
            return oldPath
        }
        return filePath
    }

    // Eksekusi pembaruan kelima file (jika ada yang direvisi)
    registration.KartuKeluarga = updateFile(req.KartuKeluarga, "KK", registration.KartuKeluarga)
    registration.AktaKelahiran = updateFile(req.AktaKelahiran, "AKTA", registration.AktaKelahiran)
    registration.Ijazah = updateFile(req.Ijazah, "IJAZAH", registration.Ijazah)
    registration.PasFoto = updateFile(req.PasFoto, "FOTO", registration.PasFoto)
    registration.BerkasPendukung = updateFile(req.BerkasPendukung, "PENDUKUNG", registration.BerkasPendukung)

    // Simpan perbaikan data ke database
    if err := database.DB.Save(&registration).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal memperbarui data pendaftaran"})
        return
    }

    c.JSON(http.StatusOK, gin.H{
        "success": true,
        "message": "Data pendaftaran berhasil diperbarui!",
    })
}