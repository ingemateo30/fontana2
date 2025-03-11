"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Features from "@/components/Features";
import Map from "@/components/Map";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { ArrowRight, MapPin, Leaf, TrendingUp, Home, ChevronDown, Phone } from "lucide-react";
import "swiper/css";
import "swiper/css/effect-fade";
import "./globals.css";
import "swiper/css/pagination";
import { FloatingWhatsApp } from "react-floating-whatsapp";

export default function Homepage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  // Controlar scroll para animaciones
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroSlides = [
    {
      image: "/fontana1.jpeg",
      title: "",
      subtitle: "Un espacio diseñado para vivir en armonía"
    },
    {
      image: "/fontana9.jpeg",
      title: "",
      subtitle: "Arquitectura que respeta el entorno natural"
    },
    {
      image: "/fontana10.jpeg",
      title: "",
      subtitle: "Un proyecto único en San Gil"
    }
  ];

  const highlights = [
    { icon: <MapPin size={24} />, title: "Ubicación Privilegiada", description: "A solo 5 minutos del centro " },
    { icon: <Leaf size={24} />, title: "Entorno Natural", description: "Rodeado de vegetación y aire puro" },
    { icon: <TrendingUp size={24} />, title: "Alta Plusvalía", description: "Inversión con crecimiento asegurado" },
    { icon: <Home size={24} />, title: "Lotes Amplios", description: "Espacios desde 126m² hasta 188m²" }
  ];

  return (
    <div className="bg-white">
      <Navbar />

      {/* Hero Section con Slider Mejorado */}
      <section className="relative w-full h-screen mt-18">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          pagination={{
            clickable: true,
            bulletActiveClass: "swiper-pagination-bullet-active !bg-[#ce6d4c] !w-8 !h-2 !rounded-full"
          }}
          effect="fade"
          className="w-full h-full"
          onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
        >
          {heroSlides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-full pb-12">
                <img src={slide.image} alt={slide.title} className="w-full h-full object-cover mb-12" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#2e4052]/80 via-[#2e4052]/50 to-transparent" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Contenido Hero con animaciones */}
        <div className="absolute inset-0 flex flex-col justify-center max-w-7xl mx-auto px-8 md:px-16 z-10">
          <div className="max-w-2xl">
            <div className="overflow-hidden mb-2">
              <div className="bg-[#ce6d4c] inline-block px-4 py-1 text-white font-medium rounded-full mb-4 transform translate-y-0 opacity-100 transition-all duration-500">
                Proyecto Exclusivo
              </div>
            </div>

            <div className="overflow-hidden">
              <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-4 transform translate-y-0 opacity-100 transition-all duration-700">
                Conjunto Residencial <br />
                <span className="text-[#ce6d4c]">Fontana</span>
              </h1>
            </div>

            <div className="overflow-hidden">
              <p className="text-xl md:text-2xl font-light mt-4 text-white transform translate-y-0 opacity-100 transition-all duration-900">
                {heroSlides[activeSlide].subtitle}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="/lotes"
                className="px-8 py-4 bg-[#ce6d4c] text-white rounded-full hover:bg-[#ce6d4c]/90 transition-all duration-300 flex items-center gap-2 font-medium shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Ver Lotes Disponibles
                <ArrowRight size={18} />
              </a>
              <a
                href="/contacto"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-full hover:bg-white/20 transition-all duration-300 font-medium flex items-center gap-2"
              >
                <Phone size={18} />
                Agendar Visita
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Nueva sección de highlights */}
      <section className="py-16 bg-white relative z-10 -mt-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-2 border-[#ce6d4c]"
              >
                <div className="w-12 h-12 rounded-full bg-[#2e4052] flex items-center justify-center text-white mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-[#2e4052] mb-2">{item.title}</h3>
                <p className="text-[#6c4634]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de proyecto */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold text-[#2e4052] mb-6 leading-tight">
                Un Proyecto Pensado <br /><span className="text-[#ce6d4c]">Para Tu Familia</span>
              </h2>
              <p className="text-[#6c4634] mb-8 text-lg">
                Fontana es más que un conjunto residencial, es un estilo de vida donde la naturaleza,
                el confort y la exclusividad se combinan para ofrecerte el hogar que siempre has soñado
                en una de las mejores ubicaciones de San Gil.
              </p>
              <div className="flex gap-6 mb-8">
                <div>
                  <p className="text-4xl font-bold text-[#ce6d4c]">24</p>
                  <p className="text-[#2e4052]">Lotes</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-[#ce6d4c]">126m²</p>
                  <p className="text-[#2e4052]">Área Mínima</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-[#ce6d4c]">100%</p>
                  <p className="text-[#2e4052]">Urbanizado</p>
                </div>
              </div>
              <a
                href="/proyecto"
                className="inline-flex items-center gap-2 text-[#ce6d4c] font-medium hover:gap-3 transition-all"
              >
                Conoce más sobre el proyecto
                <ArrowRight size={18} />
              </a>
            </div>
            <div className="md:w-1/2 relative bg-transparent">
              {/* Contenedor con sombras y bordes suaves */}
              <div className="rounded-2xl overflow-hidden shadow-xl transition-transform duration-300 hover:scale-105">
                <img
                  src="/prueba.png"
                  alt="Masterplan Fontana"
                  className="w-full h-auto object-contain bg-transparent"
                />
              </div>

              {/* Caja de información flotante mejor posicionada */}
              <div className="absolute -bottom-6 left-6 bg-[#2e4052] text-white px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-[#ce6d4c]">
                <p className="text-sm font-medium tracking-wide">🏡 Entrega inmediata</p>
                <p className="text-xl font-bold mt-1">¡Contáctanos!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Features />

      {/* Galería visual */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#2e4052] mb-4">Galería Visual</h2>
            <p className="text-[#6c4634] max-w-2xl mx-auto">
              Conoce a través de imágenes cómo será tu futuro hogar en Fontana
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative rounded-xl overflow-hidden h-80 group">
              <img src="/fontana8.png" alt="Galería" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2e4052]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white font-medium">Zona común - Piscina</p>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden h-80 group">
              <img src="/fontana6.png" alt="Galería" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2e4052]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white font-medium">Ubicacion exclusiva</p>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden h-80 group">
              <img src="/fontana7.png" alt="Galería" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2e4052]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white font-medium">Nuestro proyecto</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <a
              href="/galeria"
              className="inline-flex items-center gap-2 text-[#ce6d4c] font-medium hover:gap-3 transition-all"
            >
              Ver galería completa
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>


      <Footer />
      <div className="fixed bottom-5 right-5 flex flex-col space-y-3 z-50">
        {/* Botón de WhatsApp */}
        <FloatingWhatsApp
          phoneNumber="+573212631673"
          accountName="Fontana"
          avatar="/fontana-logo1.png"
          darkMode={true}
          statusMessage="Normalmente responde en 1 hora"
          chatMessage="¡Hola!, ¿en qué te podemos ayudar?"
          placeholder="Escribe un mensaje"
          notification={true}
          chatboxHeight={340}
        />
      </div>
    </div>
  );
}