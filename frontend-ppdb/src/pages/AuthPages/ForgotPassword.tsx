// src/pages/AuthPages/ForgotPassword.tsx

import { Link } from "react-router"; 
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import PageMeta from "../../components/common/PageMeta";
import { ThemeToggleButton } from "../../components/common/ThemeToggleButton";

export default function ForgotPassword() {
  return (
    <>
      <PageMeta title="Lupa Password | PPDB" />
      
      <div className="relative flex min-h-screen items-center justify-center bg-gray-100 p-4 dark:bg-gray-900">
        
        <div className="absolute top-4 right-4">
          <ThemeToggleButton />
        </div>
        
        <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800 sm:p-8">
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-black dark:text-white">
              Reset Password
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Masukkan email Anda. Kami akan mengirimkan link untuk mereset password.
            </p>
          </div>

          <form className="space-y-5">
            <div>
              <Label htmlFor="email">Email Terdaftar</Label>
              <Input
                type="email"
                id="email"
                placeholder="Masukkan email Anda"
              />
            </div>
            
            <div>
              <button
                type="submit" 
                className="flex w-full justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
              >
                Kirim Link Reset
              </button>
            </div>
          </form>

          <div className="text-sm text-center">
            <Link to="/signin" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
              &larr; Kembali ke Login
            </Link>
          </div>
        </div>
        
      </div>
    </>
  );
}