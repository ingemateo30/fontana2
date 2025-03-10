import Navbar from "@/components/Navbar";
import Image from "next/image";

const lotes = [
  { id: 1, nombre: "Lote 1", area: "300 m²", precio: "$120,000,000", imagen: "/images/lote1.jpg" },
  { id: 2, nombre: "Lote 2", area: "280 m²", precio: "$110,000,000", imagen: "/images/lote2.jpg" },
];

export default function Lotes() {
  return (
    <>
      <Navbar />
      <main className="bg-[#f8f8f8] min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-[#ce6d4c] text-center uppercase tracking-wide">
            Lotes Disponibles
          </h1>
          <p className="text-center text-lg text-gray-600 mt-2">
            Descubre los mejores espacios para construir tu futuro.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {lotes.map((lote) => (
              <div 
                key={lote.id} 
                className="bg-white shadow-lg rounded-xl overflow-hidden transition transform hover:scale-105 hover:shadow-2xl"
              >
                <div className="relative h-60">
                  <Image 
                    src={lote.imagen} 
                    alt={lote.nombre} 
                    layout="fill" 
                    objectFit="cover" 
                    className="rounded-t-xl"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-[#2e4052]">{lote.nombre}</h2>
                  <p className="mt-2 text-gray-500 text-lg">Área: {lote.area}</p>
                  <p className="mt-2 text-[#6c4634] text-xl font-semibold">Precio: {lote.precio}</p>
                  <button className="mt-4 w-full bg-[#ce6d4c] text-white font-semibold py-3 rounded-lg transition hover:bg-[#b95d42] hover:shadow-md">
                    Más Información
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}


