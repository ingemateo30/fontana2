import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone, faMapMarkerAlt, faChevronRight, faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const fontanaBlue = "#2e4052"; // Color azul característico de Fontana
const footerBg = "#FFFFFF";
const fontanaBlue2 = "#ce6d4c";

const Footer = () => {
  return (
    <footer className="text-gray-800 relative overflow-hidden" style={{ backgroundColor: footerBg }}>
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: fontanaBlue2 }}></div>

      {/* Main content */}
      <div className="mx-auto px-6 py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {/* Brand section */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-wider" style={{ color: fontanaBlue }}>FONTANA</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Un nuevo concepto de vida para ti y tu familia en un entorno exclusivo y seguro.
            </p>
            <div className="mt-4 flex justify-center lg:justify-start space-x-4">
              {[{ href: "https://www.facebook.com/people/Fontana-Conjunto-Residencial-San-Gil/100086386437742/", icon: faFacebook },
                { href: "https://instagram.com", icon: faInstagram },
                { href: "https://wa.me/3184792991", icon: faWhatsapp },
              ].map((social, index) => (
                <a key={index} href={social.href} target="_blank" rel="noopener noreferrer"
                  className="p-3 text-white rounded-md hover:opacity-80 transition-all"
                  style={{ backgroundColor: fontanaBlue }}>
                  <FontAwesomeIcon icon={social.icon} size="lg" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="px-4">
            <h3 className="text-lg font-semibold mb-4" style={{ color: fontanaBlue }}>NAVEGACIÓN</h3>
            <ul className="space-y-3 text-gray-700">
              {[{ href: "/", label: "Inicio" },
                { href: "/lotws", label: "Lotes Disponibles" },
                { href: "/nosotros", label: "Acerca del Proyecto" },
                { href: "/contacto", label: "Contacto" }
              ].map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="flex items-center hover:text-blue-500 transition-colors">
                    <FontAwesomeIcon icon={faChevronRight} className="mr-2" style={{ color: fontanaBlue }} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div className="px-4">
            <h3 className="text-lg font-semibold mb-4" style={{ color: fontanaBlue }}>CONTACTO</h3>
            <div className="space-y-4 text-gray-700">
              <p className="flex items-center">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-3" style={{ color: fontanaBlue }} />
                Calle 1era Sur # 24 - 35, San Gil, Colombia
              </p>
              <p className="flex items-center">
                <FontAwesomeIcon icon={faPhone} className="mr-3" style={{ color: fontanaBlue }} />
                <a href="tel:+573184792991" className="hover:text-blue-500">318 4792991</a>
              </p>
              <p className="flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="mr-3" style={{ color: fontanaBlue }} />
                <a href="mailto:gustavobenitez1284@gmail.com" className="hover:text-blue-500">
                  gustavobenitez1284@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Hours and CTA */}
          <div className="px-4">
            <h3 className="text-lg font-semibold mb-4" style={{ color: fontanaBlue }}>HORARIO</h3>
            <div className="bg-gray-100 p-5 rounded-lg">
              <p className="flex justify-between text-gray-700">
                <span>Lunes a Viernes</span>
                <span>9:00 - 17:00</span>
              </p>
              <p className="flex justify-between text-gray-700">
                <span>Sábados</span>
                <span>previa cita</span>
              </p>
              <p className="flex justify-between text-gray-700">
                <span>Domingos</span>
                <span>Previa cita</span>
              </p>
              <Link href="/contacto" className="block text-center mt-4 text-white py-3 rounded-md hover:opacity-80 transition-colors"
                style={{ backgroundColor: fontanaBlue }}>
                <FontAwesomeIcon icon={faCalendarCheck} className="mr-2" />
                Agendar Visita
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="py-4 text-center text-gray-600 text-sm" style={{ backgroundColor: "#E1E6EC" }}>
        &copy; {new Date().getFullYear()} <span className="font-semibold" style={{ color: fontanaBlue }}>Fontana</span>. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;





