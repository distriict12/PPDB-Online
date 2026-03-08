// src/layout/AppSidebar.tsx

import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";

// --- Impor Ikon (ListIcon dihapus karena tidak dipakai lagi) ---
import {
  GridIcon,
  TableIcon,
  UserCircleIcon,
  PieChartIcon,
  HorizontaLDots,
  ChevronDownIcon,
  PlugInIcon,
} from "../icons";

import { useSidebar } from "../context/SidebarContext";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

// --- MENU SUPER ADMIN (Pengaturan Sistem Sudah Dihapus) ---
const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard Utama",
    path: "/dashboard", 
  },
  {
    icon: <TableIcon />,
    name: "Manajemen Pendaftar",
    path: "/dashboard/pendaftar", 
  },
  {
    icon: <UserCircleIcon />,
    name: "Manajemen Akun Admin",
    path: "/dashboard/admin", 
  },
  // Menu "Pengaturan Sistem" telah dihapus dari sini
  {
    icon: <PieChartIcon />,
    name: "Laporan Export Data",
    path: "/dashboard/laporan", 
  },
];

const othersItems: NavItem[] = [];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});
  
  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });
    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={`menu-item-icon-size  ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text text-white">
                  {nav.name}
                </span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon className="ml-auto w-5 h-5 text-gray-400" />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text text-white">
                    {nav.name}
                  </span>
                )}
              </Link>
            )
          )}
        </li>
      ))}
    </ul>
  );

  return (
    // Menggunakan bg-[#1A222C] agar seragam dengan halaman Admin lainnya (Full Dark Mode)
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-[#1A222C] border-r border-gray-800 text-white h-screen transition-all duration-300 ease-in-out z-50 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <h1 className="text-2xl font-bold text-white">
              PPDB Admin
            </h1>
          ) : (
            <img
              src="/images/logo/logo-icon.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>

      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}>
                {isExpanded || isHovered || isMobileOpen ? "Menu" : <HorizontaLDots className="size-6" />}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>
          </div>
        </nav>
      </div>
      
      {/* === MENU BAWAH (PROFIL & LOGOUT) === */}
      <div className="mt-auto mb-6">
        <ul className="flex flex-col gap-4">
          <li>
            <Link
              to="/dashboard/profile"
              className={`menu-item group menu-item-inactive`}
            >
              <span className={`menu-item-icon-size menu-item-icon-inactive`}>
                <UserCircleIcon />
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text text-white">
                  Profil Saya
                </span>
              )}
            </Link>
          </li>
          <li>
            <Link
              to="/signin"
              className={`menu-item group menu-item-inactive`}
            >
              <span className={`menu-item-icon-size menu-item-icon-inactive`}>
                <PlugInIcon />
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text text-white">
                  Logout
                </span>
              )}
            </Link>
          </li>
        </ul>
      </div>
      
    </aside>
  );
};

export default AppSidebar;