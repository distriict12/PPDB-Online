package structs

// ErrorResponse merepresentasikan format standar balasan (response) JSON ketika terjadi kegagalan atau error pada API
type ErrorResponse struct {
    Success bool              `json:"success"`
    Message string            `json:"message"`
    Errors  map[string]string `json:"errors"`
}