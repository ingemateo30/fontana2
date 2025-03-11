"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { FloatingWhatsApp } from "react-floating-whatsapp";

export default function Nosotros() {
  // Animación para elementos que aparecen al hacer scroll
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  // Variantes para animaciones de hover
  const hoverScale = {
    hover: { scale: 1.05, transition: { duration: 0.3 } }
  };

  return (
    <div className="bg-white overflow-hidden">
      <Navbar />
      {/* Sección de Información con diseño moderno */}
      <section id="conocenos" className="max-w-7xl mx-auto px-6 py-24 mt-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="mb-16 text-center"
        >
          <h2 className="text-5xl font-bold text-[#2e4052] mb-6 inline-block relative">
            Nuestra <span className="text-[#ce6d4c]">Historia</span>
            <div className="h-1 w-24 bg-[#ce6d4c] mt-2 mx-auto"></div>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experiencia y pasión unidas para crear los mejores espacios para nuestros clientes
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Imagen con efecto de profundidad */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="relative rounded-2xl overflow-hidden group"
          >
            <div className="absolute inset-0 bg-[#2e4052] mix-blend-multiply opacity-20 group-hover:opacity-0 transition-opacity duration-500"></div>
            <Image
              src="/fontana1.jpeg"
              alt="Nosotros"
              width={800}
              height={600}
              className="w-full h-auto object-cover shadow-2xl rounded-2xl transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Elementos decorativos */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-[#ce6d4c] rounded-tl-lg opacity-70"></div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-[#ce6d4c] rounded-br-lg opacity-70"></div>
          </motion.div>

          {/* Texto con animación y mejor formato */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-[#2e4052]">
              Transformando <span className="text-[#ce6d4c]">sueños</span> en realidad
            </h3>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              En <span className="text-[#ce6d4c] font-semibold">Fontana</span>, 
              no solo vendemos terrenos, creamos <strong>oportunidades de vida</strong>. 
              Nos dedicamos a ofrecer los mejores lotes en ubicaciones privilegiadas, 
              donde calidad y excelencia se combinan perfectamente.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Nuestro equipo de expertos en bienes raíces cuenta con años de experiencia 
              en el mercado, brindando asesoría personalizada y garantizando total
              confianza y seguridad en cada inversión.
            </p>

            {/* Lista de beneficios */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-[#ce6d4c]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="ml-3 text-lg text-gray-700">Ubicaciones estratégicas con alto potencial de valorización</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-[#ce6d4c]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="ml-3 text-lg text-gray-700">Trámites legales transparentes y seguros</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-[#ce6d4c]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="ml-3 text-lg text-gray-700">Planes de financiamiento adaptados a tus necesidades</p>
              </div>
            </div>

            <div className="pt-6">
              <a
                href="/contacto"
                className="inline-block bg-[#ce6d4c] text-white px-8 py-4 rounded-full 
                           shadow-md hover:bg-[#d27e60] transition-all duration-300 transform hover:-translate-y-1"
              >
                Contáctanos
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Valores de la empresa con diseño de tarjetas modernas */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-[#2e4052] mb-6">
              Nuestros <span className="text-[#ce6d4c]">Valores</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Principios que guían cada proyecto y cada decisión que tomamos
            </p>
            <div className="h-1 w-24 bg-[#ce6d4c] mt-6 mx-auto"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              whileHover="hover"
              className="p-8 bg-white rounded-2xl shadow-xl border-t-4 border-[#ce6d4c] transform transition-all duration-300"
            >
              <div className="bg-[#ce6d4c]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-[#ce6d4c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#2e4052] mb-3 text-center">Confianza</h3>
              <p className="text-gray-700 text-center leading-relaxed">
                Operamos con total transparencia y honestidad, estableciendo relaciones duraderas basadas en la confianza mutua.
              </p>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              whileHover="hover"
              className="p-8 bg-white rounded-2xl shadow-xl border-t-4 border-[#ce6d4c] transform transition-all duration-300"
            >
              <div className="bg-[#ce6d4c]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-[#ce6d4c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#2e4052] mb-3 text-center">Innovación</h3>
              <p className="text-gray-700 text-center leading-relaxed">
                Buscamos constantemente nuevas formas de mejorar nuestros proyectos, incorporando ideas frescas y soluciones creativas.
              </p>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              whileHover="hover"
              className="p-8 bg-white rounded-2xl shadow-xl border-t-4 border-[#ce6d4c] transform transition-all duration-300"
            >
              <div className="bg-[#ce6d4c]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-[#ce6d4c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#2e4052] mb-3 text-center">Compromiso</h3>
              <p className="text-gray-700 text-center leading-relaxed">
                Nos dedicamos por completo a la satisfacción de nuestros clientes, cumpliendo siempre con lo prometido y superando expectativas.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="bg-gradient-to-r from-[#2e4052] to-[#2e4052]/90 rounded-3xl p-12 text-center text-white relative overflow-hidden shadow-2xl"
          >
            {/* Elemento decorativo */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ce6d4c]/20 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ce6d4c]/10 rounded-full -ml-32 -mb-32"></div>
            
            <h2 className="text-4xl font-bold mb-6 relative">
              ¿Listo para encontrar tu espacio ideal?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto relative opacity-90">
              Permítenos asesorarte y descubrir juntos el lote perfecto para construir tu futuro.
            </p>
            <div className="relative">
              <a
                href="/contacto"
                className="inline-block bg-[#ce6d4c] text-white px-10 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Contáctanos Ahora
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Botón de WhatsApp con diseño mejorado */}
      <div className="fixed bottom-5 right-5 flex flex-col space-y-3 z-50">
        <FloatingWhatsApp
          phoneNumber="+573212631673"
          accountName="Fontana"
          avatar="/fontana-logo1.png"
          darkMode={true}
          statusMessage="Normalmente responde en 1 hora"
          chatMessage="¡Hola! ¿En qué podemos ayudarte hoy?"
          placeholder="Escribe un mensaje..."
          notification={true}
          chatboxHeight={400}
        />
      </div>
    </div>
  );
}
