package controllers

import (
    "backend-ppdb/database"
    "backend-ppdb/helpers"
    "backend-ppdb/models"
    "backend-ppdb/structs"
    "net/http"
    "strings"

    "github.com/gin-gonic/gin"
)

// Register menangani pembuatan akun baru oleh user
func Register(c *gin.Context) {
    var req = structs.UserCreateRequest{}

    // Tangkap dan validasi format data JSON dari Frontend
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusUnprocessableEntity, structs.ErrorResponse{
            Success: false,
            Message: "Validasi Errors",
            Errors:  helpers.TranslateErrorMessage(err),
        })
        return
    }

    // Set role default ke "siswa" jika kosong
    userRole := req.Role
    if userRole == "" {
        userRole = "siswa"
    }

    // 🔥 PRE-VALIDATION 🔥
    // Mengecek semua kolom sekaligus sebelum masuk ke tahap Create DB
    var duplicates []string

    // 1. Cek apakah NISN sudah ada (Gunakan tipe data int untuk menampung jumlah data)
    var countNisn int64
    database.DB.Model(&models.User{}).Where("nisn = ?", req.NISN).Count(&countNisn)
    if countNisn > 0 {
        duplicates = append(duplicates, "nisn")
    }

    // 2. Cek apakah NIK sudah ada
    var countNik int64
    database.DB.Model(&models.User{}).Where("nik = ?", req.NIK).Count(&countNik)
    if countNik > 0 {
        duplicates = append(duplicates, "nik")
    }

    // 3. Cek apakah Email sudah ada
    var countEmail int64
    database.DB.Model(&models.User{}).Where("email = ?", req.Email).Count(&countEmail)
    if countEmail > 0 {
        duplicates = append(duplicates, "email")
    }

    // 4. Jika ada satu saja yang duplikat, hentikan proses dan lapor ke React!
    if len(duplicates) > 0 {
        // Akan menghasilkan pesan: "Duplicate fields: nisn,nik,email"
        errMsg := "Duplicate fields: " + strings.Join(duplicates, ",")
        c.JSON(http.StatusConflict, structs.ErrorResponse{
            Success: false,
            Message: errMsg,
        })
        return
    }

    // Siapkan data akun baru dengan password yang di-hash
    user := models.User{
        Name:     req.Name,
        NISN:     req.NISN,
        NIK:      req.NIK,
        Email:    req.Email,
        Role:     userRole,
        Password: helpers.HashPassword(req.Password),
    }

    // Simpan data user baru ke database
    if err := database.DB.Create(&user).Error; err != nil {
        c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
            Success: false,
            Message: "Gagal membuat akun.",
            Errors:  helpers.TranslateErrorMessage(err),
        })
        return
    }

    // Kirim respon sukses beserta data user ke Frontend
    c.JSON(http.StatusCreated, structs.SuccessResponse{
        Success: true,
        Message: "User created successfully",
        Data: structs.UserResponse{
            Id:        user.Id,
            Name:      user.Name,
            NISN:      user.NISN,
            NIK:       user.NIK,
            Email:     user.Email,
            Role:      user.Role,
            CreatedAt: user.CreatedAt.Format("2006-01-02 15:04:05"),
            UpdatedAt: user.UpdatedAt.Format("2006-01-02 15:04:05"),
        },
    })
}