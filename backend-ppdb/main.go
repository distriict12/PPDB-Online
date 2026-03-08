package main

import (
    "backend-ppdb/config"
    "backend-ppdb/database"
    "backend-ppdb/routes"
)

// main adalah titik awal (entry point) berjalannya seluruh aplikasi Backend
func main() {

    // Muat konfigurasi environment dari file .env ke dalam sistem
    config.LoadEnv()

    // Buka koneksi ke MySQL dan jalankan migrasi tabel otomatis
    database.InitDB()

    // Daftarkan seluruh jalur (routes) API be	serta middleware-nya
    r := routes.SetupRouter()

    // Jalankan server Gin pada port yang ditentukan di environment
    r.Run(":" + config.GetEnv("APP_PORT", "3000"))
}

/* ==============================================================
 * ARSIP NEGARA (JANGAN DIHAPUS)
 * ============================================================== */

// // Inisialisasi framework Gin
// router := gin.Default()

// // Buat rute pengujian (testing) menggunakan method GET
// router.GET("/", func(c *gin.Context) {

//  // Kembalikan response berupa pesan JSON
//  c.JSON(200, gin.H{
//      "message": "Hello World!",
//  })
// })

// // Jalankan server pada port yang ditentukan
// router.Run(":" + config.GetEnv("APP_PORT", "3000"))