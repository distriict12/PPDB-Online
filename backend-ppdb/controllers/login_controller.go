package controllers

import (
    "backend-ppdb/database"
    "backend-ppdb/helpers"
    "backend-ppdb/models"
    "backend-ppdb/structs"
    "net/http"

    "github.com/gin-gonic/gin"
    "golang.org/x/crypto/bcrypt"
)

// Login menangani proses autentikasi user
func Login(c *gin.Context) {

    // Siapkan penampung data request dan model user
    var req = structs.UserLoginRequest{}
    var user = models.User{}

    // Tangkap dan validasi format data JSON dari Frontend
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusUnprocessableEntity, structs.ErrorResponse{
            Success: false,
            Message: "Validation Errors",
            Errors:  helpers.TranslateErrorMessage(err),
        })
        return
    }

    // Cari user di database berdasarkan email
    if err := database.DB.Where("email = ?", req.Email).First(&user).Error; err != nil {
        c.JSON(http.StatusUnauthorized, structs.ErrorResponse{
            Success: false,
            Message: "User Not Found",
            Errors:  helpers.TranslateErrorMessage(err),
        })
        return
    }

    // Cocokkan password input dengan hash di database
    if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
        c.JSON(http.StatusUnauthorized, structs.ErrorResponse{
            Success: false,
            Message: "Invalid Password",
            Errors:  helpers.TranslateErrorMessage(err),
        })
        return
    }

    // Generate JWT token jika login berhasil
    token, err := helpers.GenerateToken(user.Id, user.Email, user.Role)

    // Return error 500 jika server gagal membuat token
    if err != nil {
        c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
            Success: false,
            Message: "Failed to generate token",
            Errors:  map[string]string{"server": "Terjadi kesalahan pada server saat memproses token"},
        })
        return
    }

    // Kirim respon sukses beserta data user dan token ke Frontend
    c.JSON(http.StatusOK, structs.SuccessResponse{
        Success: true,
        Message: "Login Success",
        Data: structs.UserResponse{
            Id:        user.Id,
            Name:      user.Name,
            NISN:      user.NISN,
            NIK:       user.NIK,
            Email:     user.Email,
            Role:      user.Role,
            CreatedAt: user.CreatedAt.String(),
            UpdatedAt: user.UpdatedAt.String(),
            Token:     &token,
        },
    })
}