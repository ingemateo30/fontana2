import Navbar from "@/components/Navbar";

export default function Contacto() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto p-6 text-center">
        <h1 className="text-4xl font-bold text-green-700">Contáctanos</h1>
        <p className="mt-4 text-gray-600">Para más información sobre Fontana, déjanos un mensaje.</p>
        <form className="mt-6 grid grid-cols-1 gap-4">
          <input type="text" placeholder="Nombre" className="p-3 border rounded-md" />
          <input type="email" placeholder="Correo Electrónico" className="p-3 border rounded-md" />
          <textarea placeholder="Mensaje" rows={4} className="p-3 border rounded-md"></textarea>
          <button className="px-6 py-3 bg-green-700 text-white rounded-md">Enviar Mensaje</button>
        </form>
      </main>
    </>
  );
}
