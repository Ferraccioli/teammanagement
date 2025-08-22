import { Menu } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Planos" },
    { path: "/alunos", label: "Alunos" },
    { path: "/turmas", label: "Turmas" },
  ];

  return (
    <div className={className}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1"
        >
          <Menu className="w-6 h-6 text-[#202020] md:w-7 md:h-7" />
        </button>
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/43e6b9a5fac32b7b9c4b7ce122d58067e719b0e9?width=56"
          alt="Profile"
          className="w-7 h-7 rounded-full md:w-9 md:h-9"
        />
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="absolute top-16 left-6 right-6 bg-white border border-gray-200 rounded-lg shadow-lg z-50 md:hidden">
          <div className="py-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 text-sm hover:bg-gray-100 ${
                  location.pathname === item.path 
                    ? "text-[#202020] font-medium bg-gray-50" 
                    : "text-gray-600"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Desktop Navigation - Hidden for now, can be expanded later */}
      <div className="hidden md:flex md:items-center md:gap-6 md:absolute md:top-4 md:left-1/2 md:transform md:-translate-x-1/2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`text-sm hover:text-[#202020] ${
              location.pathname === item.path 
                ? "text-[#202020] font-medium" 
                : "text-gray-600"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
