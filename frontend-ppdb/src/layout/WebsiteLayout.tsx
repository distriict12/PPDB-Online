// src/layout/WebsiteLayout.tsx

import { Outlet, Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-800 bg-[#1A222C]/90 backdrop-blur-md">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 z-20"> 
          <img 
            src="/images/logo/logo-icon.svg" 
            alt="Logo Sekolah" 
            className="h-10 w-10"
          />
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-none text-white">
              PPDB Online
            </span>
            <span className="text-xs font-medium text-gray-400">
              SMA NEGERI 1 CONTOH
            </span>
          </div>
        </Link>

        {/* MENU DESKTOP (Sudah ditambahkan FAQ) */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8">
          <a href="#beranda" className="text-sm font-medium text-gray-300 hover:text-blue-400 transition">
            Beranda
          </a>
          <a href="#alur" className="text-sm font-medium text-gray-300 hover:text-blue-400 transition">
            Alur & Syarat
          </a>
          <a href="#faq" className="text-sm font-medium text-gray-300 hover:text-blue-400 transition">
            FAQ & Bantuan
          </a>
        </div>

        {/* TOMBOL LOGIN */}
        <div className="flex items-center gap-4 z-20">
          <Link 
            to="/signin" 
            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring shadow-lg shadow-blue-900/20"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#1A222C] border-t border-gray-800">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex justify-center text-gray-500 sm:justify-start">
            <span className="text-sm">
              © 2025 SMA NEGERI 1 CONTOH. All rights reserved.
            </span>
          </div>
          <p className="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-right">
            Siap Mencetak Generasi Unggul
          </p>
        </div>
      </div>
    </footer>
  );
};

const WebsiteLayout = () => {
  return (
    <div className="min-h-screen bg-[#1A222C] text-white font-sans">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default WebsiteLayout;