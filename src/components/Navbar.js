"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  const navItems = [
    { name: "Inicio", path: "/" },
    { name: "Nosotros", path: "/nosotros" },
    { name: "Lotes", path: "/lotes" },
    { name: "Galeria", path: "/galeria" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 shadow-lg border-b 
        ${scrolled ? "backdrop-blur-xl bg-white/30 border-white/20" : "bg-white border-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        
        {/* Logo - Usando Next/Image para mejor rendimiento */}
        <div className="flex items-center h-10 sm:h-12 relative z-20">
          <Image
            src="/fontana-logo1.png"
            alt="Fontana Logo"
            width={120}
            height={48}
            className="h-full w-auto object-contain transform transition-transform duration-300 hover:scale-105"
            priority
          />
        </div>

        {/* Menú de escritorio */}
        <div className="hidden md:flex space-x-6 lg:space-x-8">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className="text-[#000000] text-lg font-medium transition-all duration-300 
                         relative after:block after:content-[''] after:h-[2px] after:w-0 after:bg-[#ce6d4c] 
                         after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/contacto"
            className="bg-gradient-to-r from-[#ce6d4c] to-[#a8715b] text-white px-6 py-2 rounded-full 
                       shadow-md hover:scale-105 transition-transform duration-300"
          >
            Contáctanos
          </Link>
        </div>

        {/* Botón de menú móvil */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="md:hidden z-20 p-2 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Menú"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menú móvil con animación mejorada */}
      <div
        className={`fixed inset-0 z-10 bg-black/90 backdrop-blur-lg flex flex-col items-center justify-center transition-all duration-300 ease-in-out
                   ${isMenuOpen 
                     ? "opacity-100 visible" 
                     : "opacity-0 invisible pointer-events-none"}`}
      >
        <div className="flex flex-col space-y-6 items-center w-full px-8">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              onClick={() => setIsMenuOpen(false)}
              className="text-white text-2xl font-semibold tracking-wide hover:text-[#ce6d4c] transition-colors duration-300
                         w-full text-center py-3 border-b border-white/10"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/contacto"
            onClick={() => setIsMenuOpen(false)}
            className="bg-gradient-to-r from-[#ce6d4c] to-[#a8715b] text-white px-8 py-3 rounded-full 
                      shadow-md hover:scale-105 transition-transform duration-300 mt-4 w-full text-center text-xl"
          >
            Contáctanos
          </Link>
        </div>
      </div>
    </nav>
  );
}
