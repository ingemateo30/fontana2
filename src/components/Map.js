"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { ShoppingBag, School, Car, Trees, Coffee, Hospital, Bank, Utensils } from "lucide-react";

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
const Polyline = dynamic(
  () => import("react-leaflet").then((mod) => mod.Polyline),
  { ssr: false }
);

// Centro del mapa (Fontana - San Gil, Colombia - Calle 1era Sur # 24 - 35)
const center = { lat: 6.5417, lng: -73.1325 };

// Puntos de interés alrededor del proyecto en San Gil
const pointsOfInterest = [
  { id: 1, name: "Centro Comercial El Puente", position: [6.5516, -73.1338], icon: <ShoppingBag size={20} /> },
  { id: 2, name: "Unisangil", position: [6.5387, -73.127], icon: <School size={20} /> },
  { id: 3, name: "Terminal de Transporte", position: [6.5543, -73.1490], icon: <Car size={20} /> },
  { id: 4, name: "Parque El Gallineral", position: [6.5504, -73.1285], icon: <Trees size={20} /> },
  { id: 5, name: "Hospital Regional", position: [6.5573, -73.1295], icon: <Hospital size={20} /> },
  { id: 6, name: "Parque Central de San Gil", position: [6.5546, -73.133], icon: <Utensils size={20} /> },
];

const Map = () => {
  const [selectedPOI, setSelectedPOI] = useState(null);
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [mapIcon, setMapIcon] = useState(null);
  const [poiIcons, setPoiIcons] = useState({});
  const [selectedPoiIcon, setSelectedPoiIcon] = useState(null);
  const [distances, setDistances] = useState({});

  // Calcular la distancia entre dos puntos en kilómetros usando la fórmula de Haversine
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radio de la Tierra en kilómetros
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c * 1000; // Convertir a metros
    return Math.round(distance);
  };

  // Inicializar el icono personalizado una vez que el componente se monte en el cliente
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("leaflet").then(L => {
        // Configuración de icono personalizado para el proyecto
        const customIcon = new L.Icon({
          iconUrl: "/fontana-logo1.png",
          iconSize: [120, 120],
          iconAnchor: [50, 70],
          popupAnchor: [0, 30],
        });
        
        // Calcular distancias reales entre Fontana y cada POI
        const distancesObj = {};
        pointsOfInterest.forEach(poi => {
          const distance = calculateDistance(
            center.lat, center.lng,
            poi.position[0], poi.position[1]
          );
          distancesObj[poi.id] = distance;
        });
        setDistances(distancesObj);
        
        // Crear iconos para los POIs
        const poiIconsObj = {};
        const selectedPoiIconsObj = {};
        
        pointsOfInterest.forEach(poi => {
          // Diferentes colores para diferentes tipos de POI
          let iconColor;
          switch(poi.id % 8) {
            case 1: iconColor = "#ce6d4c"; break; // Centro comercial
            case 2: iconColor = "#3b82f6"; break; // Universidad
            case 3: iconColor = "#10b981"; break; // Terminal
            case 4: iconColor = "#22c55e"; break; // Parque
            case 5: iconColor = "#8b5cf6"; break; // Hospital
            case 6: iconColor = "#ef4444"; break; // Parque Central
            case 7: iconColor = "#f59e0b"; break; // Banco
            case 0: iconColor = "#ec4899"; break; // Restaurante
            default: iconColor = "#6b7280";
          }
          
          // Icono normal
          const poiIcon = new L.DivIcon({
            className: "custom-div-icon",
            html: `<div style="background-color: ${iconColor}; width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; border-radius: 50%; color: white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">
                    <div style="font-size: 16px; font-weight: bold;">${poi.id}</div>
                  </div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15],
            popupAnchor: [0, -15],
          });
          
          // Icono seleccionado (más grande y con animación de pulso)
          const selectedIcon = new L.DivIcon({
            className: "custom-div-icon",
            html: `<div style="position: relative;">
                    <div style="background-color: ${iconColor}; width: 40px; height: 40px; display: flex; justify-content: center; align-items: center; border-radius: 50%; color: white; box-shadow: 0 0 15px ${iconColor}; animation: pulse 2s infinite;">
                      <div style="font-size: 20px; font-weight: bold;">${poi.id}</div>
                    </div>
                    <style>
                      @keyframes pulse {
                        0% { box-shadow: 0 0 0 0 rgba(${parseInt(iconColor.slice(1, 3), 16)}, ${parseInt(iconColor.slice(3, 5), 16)}, ${parseInt(iconColor.slice(5, 7), 16)}, 0.7); }
                        70% { box-shadow: 0 0 0 10px rgba(${parseInt(iconColor.slice(1, 3), 16)}, ${parseInt(iconColor.slice(3, 5), 16)}, ${parseInt(iconColor.slice(5, 7), 16)}, 0); }
                        100% { box-shadow: 0 0 0 0 rgba(${parseInt(iconColor.slice(1, 3), 16)}, ${parseInt(iconColor.slice(3, 5), 16)}, ${parseInt(iconColor.slice(5, 7), 16)}, 0); }
                      }
                    </style>
                  </div>`,
            iconSize: [40, 40],
            iconAnchor: [20, 20],
            popupAnchor: [0, -20],
          });
          
          poiIconsObj[poi.id] = poiIcon;
          selectedPoiIconsObj[poi.id] = selectedIcon;
        });
        
        setMapIcon(customIcon);
        setPoiIcons(poiIconsObj);
        setSelectedPoiIcon(selectedPoiIconsObj);
        setLeafletLoaded(true);
      });
    }
  }, []);

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
              <div className="p-6">
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
                          className={`flex items-center p-3 rounded-lg border transition-all ${
                            selectedPOI && selectedPOI.id === poi.id 
                              ? 'bg-[#f9eae3] border-[#ce6d4c] border-2 shadow-md transform scale-105' 
                              : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                          } cursor-pointer`}
                          onClick={() => setSelectedPOI(poi)}
                        >
                          <div className={`flex justify-center items-center w-8 h-8 rounded-full ${
                            selectedPOI && selectedPOI.id === poi.id ? 'bg-[#ce6d4c] animate-pulse' : 'bg-[#ce6d4c]'
                          } text-white mr-3`}>
                            {poi.id}
                          </div>
                          <div>
                            <span className="font-medium text-[#2e4052]">{poi.name}</span>
                            <div className="text-[#6c4634] text-sm flex items-center mt-1">
                              {poi.icon}
                              <span className="ml-1">{distances[poi.id] || "..."} metros</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mapa */}
          <div className="md:w-2/3 relative z-20">
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

              {/* Línea entre Fontana y el POI seleccionado */}
              {selectedPOI && (
                <Polyline 
                  positions={[
                    [center.lat, center.lng],
                    selectedPOI.position
                  ]}
                  pathOptions={{ 
                    color: "#ce6d4c", 
                    weight: 3,
                    dashArray: "5, 10",
                    opacity: 0.7
                  }}
                />
              )}

              {/* Puntos de interés */}
              {Object.keys(poiIcons).length > 0 && pointsOfInterest.map((poi) => (
                <Marker 
                  key={poi.id} 
                  position={poi.position} 
                  icon={selectedPOI && selectedPOI.id === poi.id ? selectedPoiIcon[poi.id] : poiIcons[poi.id]}
                  eventHandlers={{
                    click: () => {
                      setSelectedPOI(poi);
                    }
                  }}
                  zIndexOffset={selectedPOI && selectedPOI.id === poi.id ? 1000 : 0}
                >
                  <Popup>
                    <div className="text-center p-1">
                      <div className="flex justify-center mb-2 text-[#ce6d4c]">{poi.icon}</div>
                      <h3 className="font-medium text-[#2e4052]">{poi.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">A {distances[poi.id] || "..."} metros de Fontana</p>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {/* Radio de ubicación */}
              <Circle 
                center={[center.lat, center.lng]} 
                radius={500} 
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