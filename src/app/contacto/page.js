"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import Image from "next/image";
import { FloatingWhatsApp } from "react-floating-whatsapp";

export default function Contacto() {
  // Estado para el formulario
  const [formData, setFormData] = useState({ 
    nombre: "", 
    email: "", 
    telefono: "",
    interes: "",
    mensaje: "" 
  });
  
  // Estado para mensajes de confirmación
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ""
  });

  // Animaciones
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulación de envío exitoso
    setFormStatus({
      submitted: true,
      success: true,
      message: "¡Mensaje enviado con éxito! Te contactaremos pronto."
    });
    
    // Resetear formulario después de mostrar mensaje
    setTimeout(() => {
      setFormData({ nombre: "", email: "", telefono: "", interes: "", mensaje: "" });
      setFormStatus({submitted: false, success: false, message: ""});
    }, 5000);
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* Hero Section con imagen de fondo */}
      

      {/* Información de contacto */}
      <section className="py-16 bg-white mt-18">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#2e4052] mb-4">
              Nuestros <span className="text-[#ce6d4c]">Canales de Contacto</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Elige la forma que prefieras para comunicarte con nosotros
            </p>
            <div className="h-1 w-24 bg-[#ce6d4c] mt-4 mx-auto"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tarjeta 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-[#ce6d4c] hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-[#ce6d4c]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#ce6d4c]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#2e4052] text-center mb-4">Teléfono</h3>
              <p className="text-gray-700 text-center mb-2">Lunes a Viernes: 8am - 6pm</p>
              <p className="text-xl font-semibold text-[#ce6d4c] text-center">+57 321 263 1673</p>
            </motion.div>
            
            {/* Tarjeta 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-[#ce6d4c] hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-[#ce6d4c]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#ce6d4c]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#2e4052] text-center mb-4">Correo Electrónico</h3>
              <p className="text-gray-700 text-center mb-2">Respuesta en 24 horas</p>
              <p className="text-xl font-semibold text-[#ce6d4c] text-center">info@fontana.com</p>
            </motion.div>
            
            {/* Tarjeta 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-[#ce6d4c] hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-[#ce6d4c]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#ce6d4c]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#2e4052] text-center mb-4">Visítanos</h3>
              <p className="text-gray-700 text-center mb-2">Lunes a Sábado: 9am - 5pm</p>
              <p className="text-lg font-semibold text-[#ce6d4c] text-center">Calle Principal #123, Ciudad</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Formulario de contacto mejorado */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white p-8 rounded-xl shadow-xl"
            >
              <h2 className="text-3xl font-bold text-[#2e4052] mb-6">
                ¿Cómo podemos <span className="text-[#ce6d4c]">ayudarte?</span>
              </h2>
              
              {formStatus.submitted ? (
                <div className={`p-4 rounded-lg mb-6 ${formStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {formStatus.message}
                </div>
              ) : null}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#2e4052] font-medium mb-2">Nombre Completo</label>
                    <input 
                      type="text" 
                      name="nombre" 
                      value={formData.nombre} 
                      onChange={handleChange} 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ce6d4c]/50 focus:border-[#ce6d4c]" 
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#2e4052] font-medium mb-2">Correo Electrónico</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ce6d4c]/50 focus:border-[#ce6d4c]" 
                      required
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#2e4052] font-medium mb-2">Teléfono</label>
                    <input 
                      type="tel" 
                      name="telefono" 
                      value={formData.telefono} 
                      onChange={handleChange} 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ce6d4c]/50 focus:border-[#ce6d4c]" 
                    />
                  </div>
                  <div>
                    <label className="block text-[#2e4052] font-medium mb-2">¿Qué te interesa?</label>
                    <select 
                      name="interes" 
                      value={formData.interes} 
                      onChange={handleChange} 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ce6d4c]/50 focus:border-[#ce6d4c]"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="lotes">Lotes residenciales</option>
                      <option value="terrenos">Terrenos comerciales</option>
                      <option value="financiamiento">Opciones de financiamiento</option>
                      <option value="otro">Otra consulta</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-[#2e4052] font-medium mb-2">Mensaje</label>
                  <textarea 
                    name="mensaje" 
                    value={formData.mensaje} 
                    onChange={handleChange} 
                    className="w-full p-3 border border-gray-300 rounded-lg h-36 focus:outline-none focus:ring-2 focus:ring-[#ce6d4c]/50 focus:border-[#ce6d4c]" 
                    required
                  ></textarea>
                </div>
                
                <div className="pt-2">
                  <button 
                    type="submit" 
                    className="w-full bg-[#ce6d4c] text-white py-3 px-6 rounded-lg font-medium shadow-lg hover:bg-[#ce6d4c]/90 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Enviar Mensaje
                  </button>
                </div>
              </form>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="space-y-8"
            >
              <div>
                <h3 className="text-3xl font-bold text-[#2e4052] mb-6">
                  Preguntas <span className="text-[#ce6d4c]">Frecuentes</span>
                </h3>
                
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <h4 className="text-lg font-semibold text-[#2e4052] mb-2">¿Cuáles son las formas de pago disponibles?</h4>
                    <p className="text-gray-700">Ofrecemos diversas opciones que incluyen pago de contado con descuento, financiamiento directo y facilidades de pago a plazos.</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <h4 className="text-lg font-semibold text-[#2e4052] mb-2">¿Tienen proyectos en desarrollo actualmente?</h4>
                    <p className="text-gray-700">Sí, contamos con varios proyectos en distintas etapas. Contacta con nosotros para conocer las opciones disponibles en tu zona de interés.</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <h4 className="text-lg font-semibold text-[#2e4052] mb-2">¿Cuánto tiempo toma el proceso de compra?</h4>
                    <p className="text-gray-700">El proceso completo suele tomar entre 2 y 4 semanas, dependiendo de la modalidad de pago y los trámites legales necesarios.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#2e4052] p-8 rounded-xl text-white">
                <h4 className="text-xl font-bold mb-4">Horario de Atención</h4>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Lunes - Viernes:</span>
                    <span>8:00 AM - 5:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sábados:</span>
                    <span>9:00 AM - 12:00 M</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Domingos:</span>
                    <span>Previa cita</span>
                  </li>
                </ul>
                <div className="mt-6 pt-6 border-t border-white/20">
                  <p className="font-semibold">¿Necesitas atención inmediata?</p>
                  <p className="text-xl font-bold mt-2">+57 3184792991</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Mapa y Ubicación */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[#2e4052] mb-4">
              Nuestra <span className="text-[#ce6d4c]">Ubicación</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Visítanos en nuestras oficinas para conocer más sobre nuestros proyectos
            </p>
            <div className="h-1 w-24 bg-[#ce6d4c] mt-4 mx-auto"></div>
          </motion.div>
          
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="h-96 w-full bg-gray-200">
              {/* Aquí iría un iframe con el mapa de Google, ejemplo: */}
               
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.854489388651!2d-73.13632162977805!3d6.540052778982803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e69c0d44bcffc3d%3A0x30dfadf7003a4694!2sCl.%201%C2%AA%20Sur%20%2324%2C%20San%20Gil%2C%20Santander!5e0!3m2!1ses!2sco!4v1741706355879!5m2!1ses!2sco" 
                width="100%" 
                height="100%" 
                style={{border: 0}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe> 
            </div>
            
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-[#2e4052] mb-4">Oficina Principal</h3>
                  <div className="space-y-3 text-gray-700">
                    <p className="flex items-start">
                      <svg className="w-5 h-5 text-[#ce6d4c] mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      Calle 1era Sur # 24 - 35, San Gil, Colombia
                    </p>
                    <p className="flex items-start">
                      <svg className="w-5 h-5 text-[#ce6d4c] mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                      +57 318 4792991
                    </p>
                    <p className="flex items-start">
                      <svg className="w-5 h-5 text-[#ce6d4c] mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      gustavobenitez1284@gmail.com
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-[#2e4052] mb-4">¿Cómo llegar?</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#ce6d4c] text-white flex items-center justify-center mr-3 font-semibold">1</span>
                      Desde el centro, toma la via principal hacia charala.
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#ce6d4c] text-white flex items-center justify-center mr-3 font-semibold">2</span>
                      sube por la via principal hacia el barrio jose antonio galan.
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#ce6d4c] text-white flex items-center justify-center mr-3 font-semibold">3</span>
                      Avanza tres cuadras, nuestras oficinas están en el edificio de la esquina.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp phoneNumber="+573212631673" accountName="Fontana" />
    </div>
  );
}