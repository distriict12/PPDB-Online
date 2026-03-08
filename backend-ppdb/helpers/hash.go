package helpers

import "golang.org/x/crypto/bcrypt"

// HashPassword mengenkripsi password plain text menjadi bentuk hash yang aman
func HashPassword(password string) string{
    
    // Konversi string ke byte dan enkripsi menggunakan bcrypt dengan tingkat kerumitan standar
    hashed, _ :=bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
    
    return string(hashed)
}