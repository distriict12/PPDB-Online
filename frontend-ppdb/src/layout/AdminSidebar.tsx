// src/layout/AdminSidebar.tsx

import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router"; 
import Cookies from "js-cookie"; 

// --- Impor Ikon ---
import {
  GridIcon,
  TableIcon,
  ListIcon,
  HorizontaLDots,
  ChevronDownIcon,
  UserCircleIcon,
  PlugInIcon,
} from "../icons";

import { useSidebar } from "../context/SidebarContext";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  { icon: <GridIcon />, name: "Dashboard", path: "/admin" },
  { icon: <TableIcon />, name: "Verifikasi Pendaftar", path: "/admin/verifikasi" },
  { icon: <UserCircleIcon />, name: "Manajemen Akun", path: "/admin/manajemen-akun" },
  { icon: <ListIcon />, name: "Laporan & Cetak", path: "/admin/laporan" },
];

const othersItems: NavItem[] = [];

const AdminSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate(); 

  const [openSubmenu, setOpenSubmenu] = useState<{ type: "main" | "others"; index: number; } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => location.pathname === path, [location.pathname]);

  useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({ type: menuType as "main" | "others", index });
              submenuMatched = true;
            }
          });
        }
      });
    });
    if (!submenuMatched) setOpenSubmenu(null);
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
      if (prevOpenSubmenu && prevOpenSubmenu.type === menuType && prevOpenSubmenu.index === index) return null;
      return { type: menuType, index };
    });
  };

  // --- FUNGSI LOGOUT SAKTI ---
  const handleLogout = () => {
    Cookies.remove("user");
    Cookies.remove("token");
    navigate("/signin");
  };

  const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${openSubmenu?.type === menuType && openSubmenu?.index === index ? "menu-item-active" : "menu-item-inactive"} cursor-pointer ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"}`}
            >
              <span className={`menu-item-icon-size  ${openSubmenu?.type === menuType && openSubmenu?.index === index ? "menu-item-icon-active" : "menu-item-icon-inactive"}`}>{nav.icon}</span>
              {(isExpanded || isHovered || isMobileOpen) && <span className="menu-item-text text-white">{nav.name}</span>}
              {(isExpanded || isHovered || isMobileOpen) && <ChevronDownIcon className={`ml-auto w-5 h-5 transition-transform duration-200 text-gray-400 ${openSubmenu?.type === menuType && openSubmenu?.index === index ? "rotate-180 text-white" : ""}`} />}
            </button>
          ) : (
            nav.path && (
              <Link to={nav.path} className={`menu-item group ${isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"}`}>
                <span className={`menu-item-icon-size ${isActive(nav.path) ? "menu-item-icon-active" : "menu-item-icon-inactive"}`}>{nav.icon}</span>
                {(isExpanded || isHovered || isMobileOpen) && <span className="menu-item-text text-white">{nav.name}</span>}
              </Link>
            )
          )}
        </li>
      ))}
    </ul>
  );
  
  return (
    <aside
      // YOSHH! Di baris bawah ini kutambahkan overflow-y-auto overflow-x-hidden pb-24 no-scrollbar
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-[#1A222C] border-r border-gray-800 text-white h-screen transition-all duration-300 ease-in-out z-50 overflow-y-auto overflow-x-hidden pb-24 no-scrollbar
        ${isExpanded || isMobileOpen ? "w-[290px]" : isHovered ? "w-[290px]" : "w-[90px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 justify-between`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        <div className={`py-8 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}>
          <Link to="/admin">
            {isExpanded || isHovered || isMobileOpen ? (
              <h1 className="text-2xl font-bold text-white">ADMIN</h1>
            ) : (
              <img src="/images/logo/logo-icon.svg" alt="Logo" width={32} height={32} />
            )}
          </Link>
        </div>

        <div className="flex flex-col duration-300 ease-linear">
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
      </div>
      
      <div className="mb-6 border-t border-gray-800 pt-4 mt-auto">
        <ul className="flex flex-col gap-4">
          <li>
            <Link to="/admin/profile" className={`menu-item group ${isActive("/admin/profile") ? "menu-item-active" : "menu-item-inactive"}`}>
              <span className={`menu-item-icon-size ${isActive("/admin/profile") ? "menu-item-icon-active" : "menu-item-icon-inactive"}`}><UserCircleIcon /></span>
              {(isExpanded || isHovered || isMobileOpen) && <span className="menu-item-text text-white">Profil</span>}
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="w-full flex items-center menu-item group menu-item-inactive hover:bg-red-900/20 cursor-pointer"
            >
              <span className="menu-item-icon-size menu-item-icon-inactive text-red-500">
                <PlugInIcon />
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text text-red-500">Logout</span>
              )}
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default AdminSidebar;