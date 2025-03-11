"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { ShoppingBag, School, Car, Trees, Coffee, Hospital, Bank, Utensils } from "lucide-react";

// Importando Leaflet de forma dinámica para evitar errores de SSR
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);
const Circle = dynamic(
  () => import("react-leaflet").then((mod) => mod.Circle),
  { ssr: false }
);

// Centro del mapa (San Gil, Colombia - Calle 1era Sur # 24 - 35)
const center = { lat: 6.5486, lng: -73.1393 }; // Coordenadas aproximadas de San Gil

// Puntos de interés alrededor del proyecto en San Gil
const pointsOfInterest = [
  { id: 1, name: "Centro Comercial El Puente", position: [6.5501, -73.1412], icon: <ShoppingBag size={20} /> },
  { id: 2, name: "Universidad Libre", position: [6.5472, -73.1375], icon: <School size={20} /> },
  { id: 3, name: "Terminal de Transporte", position: [6.5462, -73.1422], icon: <Car size={20} /> },
  { id: 4, name: "Parque El Gallineral", position: [6.5520, -73.1380], icon: <Trees size={20} /> },
  { id: 5, name: "Café Colonial", position: [6.5492, -73.1405], icon: <Coffee size={20} /> },
  { id: 6, name: "Hospital Regional", position: [6.5505, -73.1345], icon: <Hospital size={20} /> },
  { id: 7, name: "Banco de la República", position: [6.5479, -73.1410], icon: <Hospital size={20} /> },
  { id: 8, name: "Restaurante Río Suárez", position: [6.5490, -73.1370], icon: <Utensils size={20} /> },
];

// Datos de los lotes disponibles
const lotMarkers = [
  { id: 1, number: "15A", position: [6.5486, -73.1383], available: true, size: "350m²", price: "$180,000" },
  { id: 2, number: "16B", position: [6.5491, -73.1388], available: true, size: "420m²", price: "$215,000" },
  { id: 3, number: "17C", position: [6.5495, -73.1393], available: false, size: "380m²", price: "$195,000" },
  { id: 4, number: "18D", position: [6.5481, -73.1390], available: true, size: "400m²", price: "$205,000" },
];

const Map = ({ showLots = false }) => {
  const [selectedLot, setSelectedLot] = useState(null);
  const [selectedPOI, setSelectedPOI] = useState(null);
  const [activeTab, setActiveTab] = useState("location");
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [mapIcon, setMapIcon] = useState(null);
  const [poiIcons, setPoiIcons] = useState({});

  // Inicializar el icono personalizado una vez que el componente se monte en el cliente
  useEffect(() => {
    // Asegurarse de que el código se ejecute solo en el navegador
    if (typeof window !== "undefined") {
      import("leaflet").then(L => {
        // Configuración de icono personalizado para el proyecto
        const customIcon = new L.Icon({
          iconUrl: "/fontana-logo1.png",
          iconSize: [30, 45],
          iconAnchor: [15, 45],
          popupAnchor: [0, -40],
        });
        
        // Crear iconos específicos para cada punto de interés
        const poiIconsObj = {};
        pointsOfInterest.forEach(poi => {
          // Diferentes colores para diferentes tipos de POI
          let iconColor;
          switch(poi.id % 8) {
            case 1: iconColor = "#ce6d4c"; break; // Centro comercial
            case 2: iconColor = "#3b82f6"; break; // Universidad
            case 3: iconColor = "#10b981"; break; // Terminal
            case 4: iconColor = "#22c55e"; break; // Parque
            case 5: iconColor = "#8b5cf6"; break; // Café
            case 6: iconColor = "#ef4444"; break; // Hospital
            case 7: iconColor = "#f59e0b"; break; // Banco
            case 0: iconColor = "#ec4899"; break; // Restaurante
            default: iconColor = "#6b7280";
          }
          
          // Crear un icono de marcador personalizado con HTML
          const poiIcon = new L.DivIcon({
            className: "custom-div-icon",
            html: `<div style="background-color: ${iconColor}; width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; border-radius: 50%; color: white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">
                     <div style="font-size: 16px; font-weight: bold;">${poi.id}</div>
                   </div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15],
            popupAnchor: [0, -15],
          });
          
          poiIconsObj[poi.id] = poiIcon;
        });
        
        setMapIcon(customIcon);
        setPoiIcons(poiIconsObj);
        setLeafletLoaded(true);
      });
    }
  }, []);

  // Reiniciar selecciones cuando cambia la pestaña
  useEffect(() => {
    setSelectedLot(null);
    setSelectedPOI(null);
  }, [activeTab]);

  // Si Leaflet aún no está cargado, mostrar un indicador de carga
  if (!leafletLoaded) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2e4052]">Cargando mapa...</h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2e4052]">Ubicación Estratégica</h2>
          <p className="mt-4 text-[#6c4634] max-w-2xl mx-auto">
            Nuestro proyecto se encuentra en una zona privilegiada de San Gil, Colombia, con excelente conectividad.
          </p>
          <p className="mt-2 font-medium text-[#ce6d4c]">
            Calle 1era Sur # 24 - 35, San Gil, Colombia
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Panel de información */}
          <div className="md:w-1/3">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="flex border-b">
                <button 
                  className={`flex-1 py-4 px-4 text-center font-medium transition-colors ${activeTab === 'location' ? 'text-[#ce6d4c] border-b-2 border-[#ce6d4c]' : 'text-gray-500 hover:text-[#2e4052]'}`}
                  onClick={() => setActiveTab('location')}
                >
                  Ubicación
                </button>
                {showLots && (
                  <button 
                    className={`flex-1 py-4 px-4 text-center font-medium transition-colors ${activeTab === 'lots' ? 'text-[#ce6d4c] border-b-2 border-[#ce6d4c]' : 'text-gray-500 hover:text-[#2e4052]'}`}
                    onClick={() => setActiveTab('lots')}
                  >
                    Lotes
                  </button>
                )}
              </div>

              <div className="p-6">
                {activeTab === 'location' && (
                  <div>
                    <h3 className="text-xl font-semibold text-[#2e4052]">Cerca de Todo</h3>
                    <p className="text-[#6c4634] mb-6">
                      Fontana está estratégicamente ubicado en San Gil, con acceso a múltiples servicios.
                    </p>
                    
                    <div className="mt-4">
                      <h4 className="font-medium text-[#2e4052] mb-3">Puntos de interés cercanos:</h4>
                      <div className="grid grid-cols-1 gap-2 max-h-80 overflow-y-auto pr-2">
                        {pointsOfInterest.map((poi) => (
                          <div 
                            key={poi.id} 
                            className={`flex items-center p-3 rounded-lg border transition-all ${selectedPOI && selectedPOI.id === poi.id ? 'bg-[#f9eae3] border-[#ce6d4c]' : 'bg-gray-50 hover:bg-gray-100 border-gray-200'} cursor-pointer`}
                            onClick={() => setSelectedPOI(poi)}
                          >
                            <div className="flex justify-center items-center w-8 h-8 rounded-full bg-[#ce6d4c] text-white mr-3">
                              {poi.id}
                            </div>
                            <div>
                              <span className="font-medium text-[#2e4052]">{poi.name}</span>
                              <div className="text-[#6c4634] text-sm flex items-center mt-1">
                                {poi.icon}
                                <span className="ml-1">350m</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'lots' && showLots && (
                  <div>
                    <h3 className="text-xl font-semibold text-[#2e4052] mb-4">Lotes Disponibles</h3>
                    <div className="space-y-3">
                      {lotMarkers.map((lot) => (
                        <div 
                          key={lot.id} 
                          className={`p-3 rounded-lg border transition-all ${!lot.available ? 'bg-gray-100 opacity-70' : selectedLot && selectedLot.id === lot.id ? 'bg-[#f9eae3] border-[#ce6d4c]' : 'bg-gray-50 hover:bg-gray-100 border-gray-200'} cursor-pointer`}
                          onClick={() => lot.available && setSelectedLot(lot)}
                        >
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium text-[#2e4052]">Lote {lot.number}</h4>
                            {lot.available ? (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">Disponible</span>
                            ) : (
                              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium">Vendido</span>
                            )}
                          </div>
                          <div className="mt-2 flex justify-between text-sm text-gray-600">
                            <span>{lot.size}</span>
                            <span className="font-semibold text-[#ce6d4c]">{lot.price}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mapa */}
          <div className="md:w-2/3 relative">
            <MapContainer 
              center={[center.lat, center.lng]} 
              zoom={15} 
              scrollWheelZoom={false}
              className="h-[600px] w-full rounded-xl shadow-lg relative"
              
            >
              {/* Capa de OpenStreetMap */}
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Marcador principal del proyecto */}
              {mapIcon && (
                <Marker position={[center.lat, center.lng]} icon={mapIcon}>
                  <Popup>
                    <div className="text-center p-1">
                      <h3 className="font-bold text-[#2e4052] text-lg">Proyecto Fontana</h3>
                      <p className="text-[#6c4634]">Calle 1era Sur # 24 - 35</p>
                      <p className="text-sm text-gray-500">San Gil, Colombia</p>
                    </div>
                  </Popup>
                </Marker>
              )}

              {/* Puntos de interés */}
              {activeTab === "location" && Object.keys(poiIcons).length > 0 && pointsOfInterest.map((poi) => (
                <Marker 
                  key={poi.id} 
                  position={poi.position} 
                  icon={poiIcons[poi.id]}
                  opacity={selectedPOI && selectedPOI.id === poi.id ? 1 : 0.8}
                  eventHandlers={{
                    click: () => {
                      setSelectedPOI(poi);
                    }
                  }}
                >
                  <Popup>
                    <div className="text-center p-1">
                      <div className="flex justify-center mb-2 text-[#ce6d4c]">{poi.icon}</div>
                      <h3 className="font-medium text-[#2e4052]">{poi.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">A 350m de Fontana</p>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {/* Lotes */}
              {activeTab === "lots" && showLots && mapIcon && lotMarkers.map((lot) => (
                <Marker 
                  key={lot.id} 
                  position={lot.position} 
                  icon={mapIcon}
                  opacity={lot.available ? (selectedLot && selectedLot.id === lot.id ? 1 : 0.7) : 0.4}
                  eventHandlers={{
                    click: () => {
                      if (lot.available) {
                        setSelectedLot(lot);
                      }
                    }
                  }}
                >
                  <Popup>
                    <div className="text-center p-1">
                      <h3 className="font-medium text-[#2e4052]">Lote {lot.number}</h3>
                      <div className="flex justify-between text-sm mt-1">
                        <span>{lot.size}</span>
                        <span className="font-semibold text-[#ce6d4c]">{lot.price}</span>
                      </div>
                      {!lot.available && (
                        <p className="text-xs text-red-500 font-medium mt-1">No disponible</p>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))}

              {/* Radio de ubicación */}
              <Circle 
                center={[center.lat, center.lng]} 
                radius={300} 
                pathOptions={{ 
                  color: "#ce6d4c",
                  fillColor: "#ce6d4c",
                  fillOpacity: 0.1 
                }} 
              />
            </MapContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Map;