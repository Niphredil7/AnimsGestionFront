// src/features/components/NavBar.tsx
import { Link, useLocation } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import { FiMenu, FiGrid, FiHome, FiBell, FiTool } from "react-icons/fi";
import { CiViewList } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import LogoutButton from "./buttons/LogoutButton";
import { notificationService } from "../../services/notification.service";
import AdminMobileSidebar, { type AdminSidebarLink } from "./SidebarAdmin";

interface NavBarProps {
  role: "ANIMATOR" | "COORDO" | "PARENT" | "VISITOR";
}

function NavBar({ role }: NavBarProps) {
  const [openSettings, setOpenSettings] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const location = useLocation();

  const { data: notifications = [] } = notificationService.getAllNotifByUser();

  // BASE ROUTES
  let homePath = "/profile";
  let notificationsPath = "/notifications";
  let dashboardPath: string | null = null;

  if (role === "ANIMATOR") {
    homePath = "/dashboard/profile";
    notificationsPath = "/dashboard/notifications";
    dashboardPath = "/dashboard";
  } else if (role === "COORDO") {
    homePath = "/admin";
    notificationsPath = "/admin/notifications";
    dashboardPath = "/admin";
  }

  const mainLinks = [
    { id: "home", to: homePath, label: "Accueil" },
    { id: "notif", to: notificationsPath, label: "Notifications" },
    ...(dashboardPath ? [{ id: "dashboard", to: dashboardPath, label: "Dashboard" }] : []),
  ];

  // 🌟 Ajout des liens admin DESKTOP uniquement
  const adminDesktopLinks = [
    { id: "room", to: "/admin/room", label: "Salles" },
    { id: "material", to: "/admin/material", label: "Matériel" },
    { id: "listings", to: "/admin/listing", label: "Listings" },
  ];

  const isActive = (linkId: string, to: string) => {
    const isExact = linkId === "dashboard";
    if (isExact) return location.pathname === to;

    return (
      location.pathname === to ||
      (to !== "/" && location.pathname.startsWith(to))
    );
  };

  // SIDEBAR LINKS
  const adminSidebarLinks: AdminSidebarLink[] = [
    { to: "/admin", label: "Dashboard", icon: <FiGrid /> },
    { to: "/admin/profile", label: "Profil", icon: <CgProfile /> },
    { to: "/admin/notifications", label: "Notifications", icon: <FiBell /> },
    { to: "/admin/room", label: "Salles", icon: <FiHome /> },
    { to: "/admin/material", label: "Matériel", icon: <FiTool /> },
    { to: "/admin/listing", label: "Listings", icon: <CiViewList /> },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-[#3C3344] shadow-md z-50">
      <nav className="flex items-center justify-between px-4 sm:px-6 py-2 h-20">
        
        {/* LEFT : Burger + Logo */}
        <div className="flex items-center gap-3">
          {role === "COORDO" && (
            <button
              type="button"
              role="menu sidebar"
              onClick={() => setOpenSidebar(true)}
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white shadow-md"
            >
              <FiMenu className="w-6 h-6" aria-label="Menu" />
            </button>
          )}

          <Link to="/" className="hidden sm:flex items-center">
            <img src="/AnimsGestionLogo.png" alt="Logo Anim's Gestion" className="h-30 w-auto" />
          </Link>
        </div>

        {/* CENTER LINKS */}
        <ul
          className={`text-white font-medium text-base sm:text-lg lg:text-3xl
            ${
              role === "COORDO"
                ? "hidden md:flex space-x-6" // ADMIN DESKTOP
                : "flex space-x-6"           // USERS / ANIMATORS ALWAYS
            }`}
        >
          {/* Links communs */}
          {mainLinks.map((link) => (
            <li key={link.id}>
              <Link
                to={link.to}
                className={`relative inline-block transition-colors duration-300 hover:text-[#c25305]
                  after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[2px]
                  after:w-full after:bg-[#c25305] after:origin-center after:scale-x-0
                  hover:after:scale-x-100 after:transition-transform after:duration-300 after:-translate-x-1/2
                  ${isActive(link.id, link.to) ? "text-[#c25305] after:scale-x-100" : ""}`}
              >
                {link.label}
              </Link>
            </li>
          ))}

          {/* ADMIN desktop: extra links */}
          {role === "COORDO" &&
            adminDesktopLinks.map((link) => (
              <li key={link.id}>
                <Link
                  to={link.to}
                  className={`relative inline-block transition-colors duration-300 hover:text-[#c25305]
                    after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[2px]
                    after:w-full after:bg-[#c25305] after:origin-center after:scale-x-0
                    hover:after:scale-x-100 after:transition-transform after:duration-300 after:-translate-x-1/2
                    ${isActive(link.id, link.to) ? "text-[#c25305] after:scale-x-100" : ""}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
        </ul>

        {/* SETTINGS */}
        <div className="relative flex items-center">
          <button
            onClick={() => setOpenSettings((prev) => !prev)}
            className="p-2 rounded-full hover:bg-[#4B3D59] transition"
          >
            <IoMdSettings
              size={50}
              className="text-[#c25305] hover:rotate-90 transition-transform"
              aria-label="Settings"
            />
          </button>

          {openSettings && (
            <div className="absolute right-0 top-12 mt-2 w-52 bg-white text-[#291F09] rounded-lg shadow-lg">
              <ul className="py-2 text-sm">
                <li>
                  <Link to="changeprofile">
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                      Modifier le profil
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="changeprofile/changepassword">
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                      Modifier le mot de passe
                    </button>
                  </Link>
                </li>
                <li>
                  <LogoutButton />
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      {/* SIDEBAR admin mobile */}
      {role === "COORDO" && (
        <AdminMobileSidebar
          open={openSidebar}
          onClose={() => setOpenSidebar(false)}
          links={adminSidebarLinks}
        />
      )}
    </header>
  );
}

export default NavBar;
