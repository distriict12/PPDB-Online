package helpers

import (
    "fmt"
    "strings"

    "github.com/go-playground/validator/v10"
    "gorm.io/gorm"
)

// TranslateErrorMessage mengubah error teknis (validasi & database) menjadi pesan ramah pengguna
func TranslateErrorMessage(err error) map[string]string {
    
    // Siapkan wadah penampung daftar error spesifik per kolom
    errorsMap := make(map[string]string)

    // Terjemahkan error dari aturan validasi struct (validator.v10)
    if validationErrors, ok := err.(validator.ValidationErrors); ok {
        for _, fieldError := range validationErrors {
            field := fieldError.Field() 
            
            // Berikan pesan spesifik sesuai jenis aturan yang dilanggar
            switch fieldError.Tag() {   
            case "required":
                errorsMap[field] = fmt.Sprintf("%s is required", field) 
            case "email":
                errorsMap[field] = "Invalid email format" 
            case "unique":
                errorsMap[field] = fmt.Sprintf("%s already exists", field) 
            case "min":
                errorsMap[field] = fmt.Sprintf("%s must be at least %s characters", field, fieldError.Param()) 
            case "max":
                errorsMap[field] = fmt.Sprintf("%s must be at most %s characters", field, fieldError.Param()) 
            case "numeric":
                errorsMap[field] = fmt.Sprintf("%s must be a number", field) 
            default:
                errorsMap[field] = "Invalid value" 
            }
        }
    }

    // Tangkap dan terjemahkan error bawaan dari database (GORM/MySQL)
    if err != nil {
        
        // Deteksi jika ada bentrok data duplikat pada NIK, NISN, atau Email
        if strings.Contains(err.Error(), "Duplicate entry") {
            if strings.Contains(err.Error(), "nisn") {
                errorsMap["nisn"] = "NISN sudah terdaftar" 
            }
            if strings.Contains(err.Error(), "nik") {
                errorsMap["nik"] = "NIK sudah terdaftar" 
            }
            if strings.Contains(err.Error(), "email") {
                errorsMap["email"] = "Email sudah terdaftar" 
            }
        } else if err == gorm.ErrRecordNotFound {
            // Tangani jika query pencarian tidak membuahkan hasil
            errorsMap["Error"] = "Record not found"
        }
    }

    // Kembalikan kumpulan pesan error dalam format yang siap ditangkap Frontend
    return errorsMap
}

// IsDuplicateEntryError mendeteksi cepat apakah error disebabkan oleh bentrok data di MySQL
func IsDuplicateEntryError(err error) bool {
    return err != nil && strings.Contains(err.Error(), "Duplicate entry")
}