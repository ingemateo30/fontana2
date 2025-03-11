"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

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

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 shadow-lg border-b 
        ${scrolled ? "backdrop-blur-xl bg-white/30 border-white/20" : "bg-white border-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        <div className="flex items-center space-x-2 h-12">
          <img
            src="/fontana-logo1.png"
            alt="Fontana Logo"
            className="h-full w-auto object-contain scale-200 transition-transform duration-300 hover:scale-250"
          />
        </div>

        <div className="hidden md:flex space-x-8">
          {["Inicio", "Nosotros", "Lotes", "Galeria"].map((item, index) => (
            <Link
              key={index}
              href={item === "Inicio" ? "/" : `/${item.toLowerCase()}`}
              className="text-[#000000] text-lg font-medium transition-all duration-300 
                         relative after:block after:content-[''] after:h-[2px] after:w-0 after:bg-[#ce6d4c] 
                         after:transition-all after:duration-300 hover:after:w-full"
            >
              {item}
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

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-black">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 bg-black/80 backdrop-blur-lg flex flex-col items-center justify-center transition-opacity 
                   duration-300 ${isMenuOpen ? "opacity-100 visible" : "hidden"}`}
      >
        <button onClick={() => setIsMenuOpen(false)} className="absolute top-4 right-4 text-white p-2">
          <X size={32} />
        </button>
        <div className="flex flex-col space-y-6 text-center">
          {["Inicio", "Nosotros", "Lotes", "Galeria", "Contacto"].map((item, index) => (
            <Link
              key={index}
              href={item === "Inicio" ? "/" : `/${item.toLowerCase()}`}
              onClick={() => setIsMenuOpen(false)}
              className="text-white text-2xl font-semibold tracking-wide hover:text-[#ce6d4c] transition-colors duration-300"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
