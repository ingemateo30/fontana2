import LotDetail from "./LotDetail";
import { lots } from "@/data/lots"; // Asegúrate de que la ruta sea correcta

const LotDetailPage = ({ params }) => {
  const { id } = params; // Obtiene el ID desde la URL
  const lot = lots.find((l) => l.id === parseInt(id));

  if (!lot) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-2xl font-bold text-gray-800">Lote no encontrado</h2>
      </div>
    );
  }

  return <LotDetail lot={lot} />;
};

export default LotDetailPage;
