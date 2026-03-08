package structs

// SuccessResponse merepresentasikan format standar balasan (response) JSON untuk setiap request API yang berhasil
type SuccessResponse struct {
    Success bool   `json:"success"`
    Message string `json:"message"`
    Data    any    `json:"data"` // Menggunakan 'any' agar fleksibel menampung bentuk data apapun (User, Registration, dll)
}