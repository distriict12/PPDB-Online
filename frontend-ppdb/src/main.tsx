// src/main.tsx

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { BrowserRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Import AuthProvider untuk manajemen state autentikasi global
import { AuthProvider } from './context/AuthContext.tsx';

// Inisialisasi instance QueryClient
const queryClient = new QueryClient();

// Konfigurasi default untuk tema antarmuka (Dark Mode)
// Memaksa penggunaan tema gelap dengan menimpa preferensi tema sebelumnya di localStorage
localStorage.setItem("color-theme", "dark");
if (!document.documentElement.classList.contains("dark")) {
  document.documentElement.classList.add("dark");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Membungkus aplikasi dengan AuthProvider untuk menyediakan status login global */}
    <AuthProvider>
      <BrowserRouter>
        {/* Membungkus aplikasi dengan QueryClientProvider untuk fitur data fetching */}
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <AppWrapper>
              <App />
            </AppWrapper>
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);