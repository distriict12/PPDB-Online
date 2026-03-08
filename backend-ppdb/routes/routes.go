package routes

import (
    "backend-ppdb/controllers"
    "backend-ppdb/middlewares"

    "github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"
)

// SetupRouter menginisialisasi router Gin beserta seluruh endpoint API
func SetupRouter() *gin.Engine {

    // Inisialisasi framework Gin
    router := gin.Default()

    // Konfigurasi CORS agar API dapat menerima request dari domain Frontend
    router.Use(cors.New(cors.Config{
        AllowOrigins:  []string{"*"},                                       // Izinkan semua domain (untuk tahap development)
        AllowMethods:  []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}, // Metode HTTP yang diizinkan
        AllowHeaders:  []string{"Origin", "Content-Type", "Authorization"}, // Header yang diizinkan (termasuk Token JWT)
        ExposeHeaders: []string{"Content-Length"},
    }))

    // =========================================================================
    // 🔓 PUBLIC ZONE (Bebas Akses Tanpa Token)
    // =========================================================================

    // Pendaftaran akun baru (Siswa / Admin)
    router.POST("/api/register", controllers.Register)

    // Autentikasi login untuk mendapatkan token JWT
    router.POST("/api/login", controllers.Login)

    // Akses folder statis untuk menampilkan file unggahan (foto/dokumen) di browser
    router.Static("/uploads", "./uploads")

    // =========================================================================
    // 🔒 LOCKED ZONE (Wajib Bawa Token JWT)
    // =========================================================================

    // --- A. MANAJEMEN AKUN PENGGUNA (USERS) ---

    // Ambil seluruh data pengguna
    router.GET("/api/users", middlewares.AuthMiddleware(), controllers.FindUser)

    // Ambil data satu pengguna secara spesifik berdasarkan ID
    router.GET("/api/users/:id", middlewares.AuthMiddleware(), controllers.FindUserById)

    // Perbarui data profil pengguna berdasarkan ID
    router.PUT("/api/users/:id", middlewares.AuthMiddleware(), controllers.UpdateUser)

    // Hapus akun pengguna secara permanen berdasarkan ID
    router.DELETE("/api/users/:id", middlewares.AuthMiddleware(), controllers.DeleteUser)

    // --- B. MANAJEMEN PENDAFTARAN (REGISTRATIONS) ---

    // Ambil seluruh data formulir pendaftaran (Untuk Tabel Dashboard Admin)
    router.GET("/api/registrations", middlewares.AuthMiddleware(), controllers.FindRegistrations)

    // Kirim formulir pendaftaran baru beserta lampiran file dokumen (Siswa)
    router.POST("/api/registrations", middlewares.AuthMiddleware(), controllers.CreateRegistration)

    // Perbarui status dan catatan pendaftaran (Aksi Verifikasi/Tolak oleh Admin)
    router.PUT("/api/registrations/:id", middlewares.AuthMiddleware(), controllers.UpdateRegistration)

    // Hapus data formulir pendaftaran secara permanen
    router.DELETE("/api/registrations/:id", middlewares.AuthMiddleware(), controllers.DeleteRegistration)

    // Kirim ulang (resubmit) formulir pendaftaran setelah ada perbaikan data dari siswa
    router.PUT("/api/registrations", middlewares.AuthMiddleware(), controllers.ResubmitRegistration)

    return router
}