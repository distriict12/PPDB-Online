package config

import (
    "log"
    "os"

    "github.com/joho/godotenv"
)

// LoadEnv memuat semua environment variable dari file .env ke dalam sistem
func LoadEnv() {
    
    // Muat file .env, gunakan environment bawaan OS/Server jika tidak ditemukan
    err := godotenv.Load()
    if err != nil {
        log.Print("Warning: No .env file found, using system environment variables")
    }
}

// GetEnv mengambil nilai environment berdasarkan key, atau mengembalikan nilai default jika tidak ada
func GetEnv(key string, defaultValue string) string {                       
    value, exist := os.LookupEnv(key)
    
    // Jika key tidak ditemukan, gunakan nilai cadangan
    if !exist {
        return defaultValue
    }
    return value                                                                                                                                                                                                                    
}