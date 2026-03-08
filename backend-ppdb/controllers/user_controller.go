package controllers

import (
    "backend-ppdb/database"
    "backend-ppdb/helpers"
    "backend-ppdb/models"
    "backend-ppdb/structs"
    "net/http"

    "github.com/gin-gonic/gin"
)

// FindUser mengambil semua data akun pengguna dari database
func FindUser(c *gin.Context) {

    // Siapkan penampung data mentah dari database
    var users []models.User
    database.DB.Find(&users)

    // Siapkan array respon agar format data lebih rapi dan aman
    var usersResponse []structs.UserResponse

    // Mapping data mentah ke format respon yang disetujui
    for _, user := range users {
        usersResponse = append(usersResponse, structs.UserResponse{
            Id:        user.Id,
            Name:      user.Name,
            NISN:      user.NISN,
            NIK:       user.NIK,
            Email:     user.Email,
            Role:      user.Role,
            CreatedAt: user.CreatedAt.String(),
            UpdatedAt: user.UpdatedAt.String(),
        })
    }

    // Kirim respon sukses beserta list keseluruhan pengguna
    c.JSON(http.StatusOK, structs.SuccessResponse{
        Success: true,
        Message: "List Data Users",
        Data:    usersResponse,
    })
}

// FindUserById mencari data satu pengguna secara spesifik berdasarkan ID
func FindUserById(c *gin.Context) {

    // Tangkap ID dari parameter URL
    id := c.Param("id")
    var user models.User

    // Cari user di database, return 404 jika tidak ditemukan
    if err := database.DB.First(&user, id).Error; err != nil {
        c.JSON(http.StatusNotFound, structs.ErrorResponse{
            Success: false,
            Message: "User Not Found",
            Errors:  helpers.TranslateErrorMessage(err),
        })
        return
    }

    // Kirim respon sukses beserta detail data pengguna
    c.JSON(http.StatusOK, structs.SuccessResponse{
        Success: true,
        Message: "User Found",
        Data: structs.UserResponse{
            Id:        user.Id,
            Name:      user.Name,
            NISN:      user.NISN,
            NIK:       user.NIK,
            Email:     user.Email,
            Role:      user.Role,
            CreatedAt: user.CreatedAt.String(),
            UpdatedAt: user.UpdatedAt.String(),
        },
    })
}

// UpdateUser menangani pembaruan data akun (Nama, Email, atau Password)
func UpdateUser(c *gin.Context) {

    // Tangkap ID dan pastikan usernya ada di database
    id := c.Param("id")
    var user models.User

    if err := database.DB.First(&user, id).Error; err != nil {
        c.JSON(http.StatusNotFound, structs.ErrorResponse{
            Success: false,
            Message: "User Not Found",
            Errors:  helpers.TranslateErrorMessage(err),
        })
        return
    }

    // Tangkap dan validasi data baru dari Frontend
    var req = structs.UserUpdateRequest{}
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusUnprocessableEntity, structs.ErrorResponse{
            Success: false,
            Message: "Validation Error",
            Errors:  helpers.TranslateErrorMessage(err),
        })
        return
    }

    // Update field hanya jika datanya diisi (tidak kosong)
    if req.Name != "" {
        user.Name = req.Name
    }
    if req.Email != "" {
        user.Email = req.Email
    }
    if req.Password != "" {
        user.Password = helpers.HashPassword(req.Password) // Hash password baru
    }

    // Simpan perubahan secara permanen ke DB
    if err := database.DB.Save(&user).Error; err != nil {
        c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
            Success: false,
            Message: "Failed to update user",
            Errors:  helpers.TranslateErrorMessage(err),
        })
        return
    }

    // Kirim respon sukses beserta data user terbaru
    c.JSON(http.StatusOK, structs.SuccessResponse{
        Success: true,
        Message: "User Update Successfully",
        Data: structs.UserResponse{
            Id:        user.Id,
            Name:      user.Name,
            NISN:      user.NISN,
            NIK:       user.NIK,
            Email:     user.Email,
            Role:      user.Role,
            CreatedAt: user.CreatedAt.String(),
            UpdatedAt: user.UpdatedAt.String(),
        },
    })
}

// DeleteUser menghapus akun pengguna secara permanen dari sistem
func DeleteUser(c *gin.Context) {

    // Tangkap ID dan pastikan usernya ada sebelum dihapus
    id := c.Param("id")
    var user models.User

    if err := database.DB.First(&user, id).Error; err != nil {
        c.JSON(http.StatusNotFound, structs.ErrorResponse {
            Success: false,
            Message: "User Not Found",
            Errors: helpers.TranslateErrorMessage(err),
        })
        return
    }

    // Eksekusi penghapusan dari database
    if err := database.DB.Delete(&user).Error; err != nil {
        c.JSON(http.StatusInternalServerError, structs.ErrorResponse {
            Success: false,
            Message: "Failed to delete user",
            Errors: helpers.TranslateErrorMessage(err),
        })
        return
    }

    // Kirim respon sukses penghapusan
    c.JSON(http.StatusOK, structs.SuccessResponse {
        Success: true,
        Message: "User deleted successfully",
    })
}