import React, { useState } from 'react';
import { TreePine, ShieldCheck, Droplets, Road, Leaf, Home } from "lucide-react";

const Features = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const features = [
    {
      icon: <TreePine size={40} className="text-[#ce6d4c]" />,
      title: "Áreas Verdes",
      description: "Amplios espacios naturales y zonas recreativas para el bienestar de toda la familia.",
    },
    {
      icon: <ShieldCheck size={40} className="text-[#ce6d4c]" />,
      title: "Seguridad 24/7",
      description: "Acceso controlado y vigilancia permanente para una vida tranquila.",
    },
    {
      icon: <Droplets size={40} className="text-[#ce6d4c]" />,
      title: "Servicios Básicos",
      description: "Infraestructura completa con agua, electricidad y drenaje.",
    },
    {
      icon: <Leaf size={40} className="text-[#ce6d4c]" />,
      title: "Vías Pavimentadas",
      description: "Calles amplias, bien iluminadas y con excelente acceso.",
    },
    {
      icon: <Leaf size={40} className="text-[#ce6d4c]" />,
      title: "Sostenibilidad",
      description: "Diseño amigable con el medio ambiente y respeto por la naturaleza.",
    },
    {
      icon: <Home size={40} className="text-[#ce6d4c]" />,
      title: "Diseño Exclusivo",
      description: "Normativa arquitectónica que garantiza armonía y valorización.",
    },
  ];

  return (
    <section className="bg-white relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-[#ce6d4c] opacity-5 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#2e4052] opacity-5 translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-[#2e4052] mb-4 relative inline-block">
            Características Excepcionales
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#ce6d4c]"></span>
          </h2>
          <p className="text-[#6c4634] mt-6 text-lg max-w-2xl mx-auto font-medium">
            Un desarrollo pensado para la comodidad y el estilo de vida que mereces, con detalles que marcan la diferencia.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={`
                relative z-10 rounded-xl p-8 h-full transform transition-all duration-300
                ${hoveredIndex === index ? 'bg-[#2e4052] -translate-y-2 shadow-xl' : 'bg-white shadow-md border border-gray-100'}
              `}>
                <div className={`
                  text-5xl mb-6 transform transition-all duration-300
                  ${hoveredIndex === index ? 'text-white scale-110' : 'text-[#ce6d4c]'}
                `}>
                  {feature.icon}
                </div>
                <h3 className={`
                  text-xl font-bold mb-3 transition-colors duration-300
                  ${hoveredIndex === index ? 'text-white' : 'text-[#2e4052]'}
                `}>
                  {feature.title}
                </h3>
                <p className={`
                  transition-colors duration-300
                  ${hoveredIndex === index ? 'text-gray-200' : 'text-[#6c4634]'}
                `}>
                  {feature.description}
                </p>
              </div>
              
              {/* Elemento decorativo de fondo */}
              <div className={`
                absolute top-4 right-4 w-16 h-16 rounded-full bg-[#ce6d4c] opacity-10
                transition-all duration-300
                ${hoveredIndex === index ? 'scale-150 opacity-20' : 'scale-100'}
              `}></div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Banner inferior */}
      <div className="mt-20 py-8 bg-gradient-to-r from-[#2e4052] to-[#2e4052] text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-2">¿Listo para conocer tu futuro hogar?</h3>
          <p className="mb-4">Agenda una visita y descubre todos los beneficios en persona</p>
          <button className="bg-[#ce6d4c] hover:bg-[#ce6d4c]/90 text-white font-medium py-3 px-8 rounded-full transition-all transform hover:scale-105">
            Solicitar información
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;

