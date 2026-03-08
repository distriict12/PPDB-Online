package middlewares

import (
    "backend-ppdb/config"
    "net/http"
    "strings"

    "github.com/gin-gonic/gin"
    "github.com/golang-jwt/jwt/v5"
)

// Ambil kunci rahasia JWT dari environment atau gunakan default
var jwtKey = []byte(config.GetEnv("JWT_SECRET", "secret_key"))

// AuthMiddleware memvalidasi token JWT pada setiap request yang masuk
func AuthMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {

        tokenString := c.GetHeader("Authorization")

        // Tolak akses jika header Authorization tidak disematkan
        if tokenString == "" {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Token is required"})
            c.Abort()
            return
        }

        // Hapus awalan "Bearer " untuk mendapatkan string token murni
        tokenString = strings.TrimPrefix(tokenString, "Bearer ")

        // Parse dan validasi token menggunakan kunci rahasia
        token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
            return jwtKey, nil
        })

        // Hentikan proses jika token sudah kadaluarsa atau tidak valid
        if err != nil || !token.Valid {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
            c.Abort()
            return
        }

        // Ekstrak data payload (claims) dari dalam token
        if claims, ok := token.Claims.(jwt.MapClaims); ok {
            
            // Simpan email dan role ke context untuk digunakan oleh controller
            c.Set("email", claims["sub"])
            c.Set("role", claims["role"])

            // Konversi tipe ID dari float64 (bawaan pembacaan JSON) menjadi uint agar sinkron dengan database
            if idFloat, ok := claims["id"].(float64); ok {
                c.Set("id", uint(idFloat))
            }
        } else {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token claims"})
            c.Abort()
            return
        }

        // Izinkan request lanjut ke controller tujuan jika semua pemeriksaan lolos
        c.Next()
    }
}