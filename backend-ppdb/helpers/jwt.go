package helpers

import (
    "backend-ppdb/config"
    "time"

    "github.com/golang-jwt/jwt/v5"
)

// Ambil kunci rahasia JWT dari environment (.env) atau gunakan default
var jwtKey = []byte(config.GetEnv("JWT_SECRET", "secret_key"))

// GenerateToken membuat token JWT baru yang berisi identitas dan hak akses user
func GenerateToken(id uint, email string, role string) (string, error) {

    // Set waktu kadaluarsa token (contoh: 60 menit dari sekarang)
    expirationTime := time.Now().Add(60 * time.Minute)

    // Susun payload (claims) berisi data user dan batas waktu berlakunya
    claims := jwt.MapClaims{
        "id": id,
        "sub": email,
        "role": role,
        "exp": jwt.NewNumericDate(expirationTime),
        "iss": "ppdb-online",
    }

    // Generate dan tandatangani token menggunakan algoritma HS256 beserta kunci rahasia
    tokenString, err := jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString(jwtKey)

    // Kembalikan token dalam bentuk string untuk dikirim ke Frontend
    return tokenString, err
}