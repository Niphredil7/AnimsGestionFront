// src/features/components/SidebarAdmin.tsx
import { Link, useLocation } from "react-router-dom";
import { FiX } from "react-icons/fi";
import type { ReactNode } from "react";

export interface AdminSidebarLink {
  to: string;
  label: string;
  icon: ReactNode;
}

interface AdminMobileSidebarProps {
  open: boolean;
  onClose: () => void;
  links: AdminSidebarLink[];
}

export default function AdminMobileSidebar({
  open,
  onClose,
  links,
}: AdminMobileSidebarProps) {
  const location = useLocation();

  if (!open) return null; // rien à afficher si fermé

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <div className="fixed inset-0 z-40 md:hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Panneau gauche */}
      <div className="absolute inset-y-0 left-0 w-64 bg-[#3C3344] text-white shadow-xl flex flex-col">
        {/* Header sidebar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <span className="font-semibold text-lg">Menu coordinateur</span>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10"
            aria-label="Fermer le menu"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Liens */}
        <nav className="flex-1 py-2">
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 text-base transition-colors ${
                    isActive(link.to)
                      ? "bg-orange-500 text-white"
                      : "text-gray-100 hover:bg-white/10"
                  }`}
                >
                  <span className="w-5 h-5 flex items-center justify-center">
                    {link.icon}
                  </span>
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
