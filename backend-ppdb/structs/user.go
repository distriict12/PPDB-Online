package structs

// UserResponse memformat data akun pengguna agar rapi dan aman saat dikembalikan sebagai respon API
type UserResponse struct {
    Id        uint   `json:"id"`
    Name      string `json:"name"`
    NISN      string `json:"nisn"`
    NIK       string `json:"nik"`
    Email     string `json:"email"`
    Role      string `json:"role"`
    CreatedAt string `json:"created_at"`
    UpdatedAt string `json:"updated_at"`
    // CreatedAt time.Time `json:"created_at"`
    // UpdatedAt time.Time `json:"updated_at"`
    Token *string `json:"token,omitempty"`
}

// UserCreateRequest menangkap dan memvalidasi payload JSON saat pendaftaran akun baru
type UserCreateRequest struct {
    Name     string `json:"name" binding:"required"`
    NISN     string `json:"nisn" binding:"required,max=20"`
    NIK      string `json:"nik" binding:"required,max=20"`
    Email    string `json:"email" binding:"required,email"`
    Password string `json:"password" binding:"required,min=6"`
    Role     string `json:"role"`
}

// UserUpdateRequest menangkap input perubahan data profil (nama, email, dan password opsional)
type UserUpdateRequest struct {
    Name     string `json:"name" binding:"required"`
    Email    string `json:"email" binding:"required,email"`
    Password string `json:"password,omitempty"`
}

// UserLoginRequest menangkap kredensial email dan password saat proses autentikasi login
type UserLoginRequest struct {
    Email    string `json:"email" binding:"required"`
    Password string `json:"password" binding:"required"`
}