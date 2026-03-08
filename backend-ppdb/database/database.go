package database

import (
    "backend-ppdb/config"
    "backend-ppdb/models"
    "fmt"
    "log"

    "gorm.io/driver/mysql"
    "gorm.io/gorm"
)

var DB *gorm.DB

// InitDB menginisialisasi koneksi ke database MySQL dan menjalankan migrasi otomatis
func InitDB() {
    
    // Ambil kredensial dan konfigurasi database dari environment variables (.env)
    dbUser := config.GetEnv("DB_USER", "root")
    dbPass := config.GetEnv("DB_PASS", "")
    dbHost := config.GetEnv("DB_HOST", "localhost")
    dbPort := config.GetEnv("DB_PORT", "3306")
    dbName := config.GetEnv("DB_NAME", "")

    // Format string koneksi (DSN) khusus untuk MySQL
    dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
        dbUser, dbPass, dbHost, dbPort, dbName)

    // Buka koneksi ke database menggunakan GORM
    var err error
    DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
    if err != nil {
        log.Fatal("Failed to connect to database:", err)
    }

    fmt.Println("Database connected successfully!")

    // Jalankan migrasi otomatis untuk mencocokkan skema tabel dengan struct model
    err = DB.AutoMigrate(
        &models.User{},
        &models.Registration{},
    ) // Tambahkan model lain di sini jika ada pembuatan tabel baru
        
    if err != nil {
        log.Fatal("Failed to migrate database:", err)
    }

    fmt.Println("Database migrated successfully!")
}