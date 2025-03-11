"use client";

import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

const LotDetail = ({ lot }) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Imagen */}
        <div className="relative">
          <img src={lot.image} alt={`Lote ${lot.number}`} className="w-full h-64 object-cover" />
          {!lot.available && (
            <div className="absolute top-0 left-0 bg-red-600 text-white px-4 py-2 text-lg font-bold">
              Vendido
            </div>
          )}
        </div>

        {/* Información */}
        <div className="p-6">
          <h2 className="text-3xl font-bold text-orange-500">Lote {lot.number}</h2>
          <ul className="mt-4 space-y-2 text-gray-700 text-lg">
            <li><strong>Tamaño:</strong> {lot.size} m²</li>
            <li><strong>Precio:</strong> ${lot.price.toLocaleString()}</li>
            <li><strong>Ubicación:</strong> {lot.location}</li>
            <li>
              <strong>Estado:</strong>{" "}
              <span className={lot.available ? "text-green-600" : "text-red-600"}>
                {lot.available ? "Disponible" : "Vendido"}
              </span>
            </li>
          </ul>

          {/* Botón de volver */}
          <div className="mt-6">
            <Link href="/lotes" className="px-6 py-3 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-800 transition">
              Volver a Lotes
            </Link>
          </div>
        </div>
      </div>

      {/* Botón de WhatsApp */}
      <a
        href="https://wa.me/573184792991"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300"
      >
        <FaWhatsapp className="text-3xl" />
      </a>
    </div>
  );
};

export default LotDetail;
