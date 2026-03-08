                                                                  // src/layout/SiswaLayout.tsx
                                                                  // (File ini adalah DUPLIKAT dari AdminLayout.tsx)

                                                                  import { SidebarProvider, useSidebar } from "../context/SidebarContext";
                                                                  import { Outlet } from "react-router";
                                                                  import AppHeader from "./AppHeader"; // Header-nya tetap sama (walau sudah bersih)
                                                                  import Backdrop from "./Backdrop";
                                                                  // 1. UBAH IMPOR INI
                                                                  import SiswaSidebar from "./SiswaSidebar"; // Ganti dari AdminSidebar

                                                                  const LayoutContent: React.FC = () => {
                                                                    const { isExpanded, isHovered, isMobileOpen } = useSidebar();

                                                                    return (
                                                                      <div className="min-h-screen xl:flex">
                                                                        <div>
                                                                          {/* 2. UBAH KOMPONEN INI */}
                                                                          <SiswaSidebar /> {/* Ganti dari AdminSidebar */}
                                                                          <Backdrop />
                                                                        </div>
                                                                        <div
                                                                          className={`flex-1 transition-all duration-300 ease-in-out ${
                                                                            isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
                                                                          } ${isMobileOpen ? "ml-0" : ""}`}
                                                                        >
                                                                          <AppHeader />
                                                                          <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
                                                                            <Outlet />
                                                                          </div>
                                                                        </div>
                                                                      </div>
                                                                    );
                                                                  };

                                                                  // 3. UBAH NAMA KOMPONEN UTAMA
                                                                  const SiswaLayout: React.FC = () => {
                                                                    return (
                                                                      <SidebarProvider>
                                                                        <LayoutContent />
                                                                      </SidebarProvider>
                                                                    );
                                                                  };

                                                                  export default SiswaLayout; // Pastikan export-nya SiswaLayout