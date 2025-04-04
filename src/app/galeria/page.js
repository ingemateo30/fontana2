"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { ArrowRight } from "lucide-react";

const images = [
  "/fontana8.png",
  "/fontana6.png",
  "/fontana7.png",
  "/fontana9.jpeg",
  "/fontana10.jpeg",
  "/fontana1.jpeg"
];

export default function Galeria() {
  return (
    <div className="bg-white mt-18">
      <Navbar />
      {/* Galería de imágenes */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {images.map((img, index) => (
            <div key={index} className="relative group overflow-hidden rounded-xl shadow-lg">
              <img
                src={img}
                alt={`Galería ${index}`}
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white font-medium">
                Ver Imagen
              </div>
            </div>
          ))}
        </div>
      </section> 
      <Footer />
    </div>
  );
}