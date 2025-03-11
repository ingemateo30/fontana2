

"use client";

import { useState, useEffect, useCallback } from "react";
import { GoogleMap, Marker, InfoWindow, Circle } from "@react-google-maps/api";
import dynamic from "next/dynamic";
import { MapPin, Navigation, ShoppingBag, School, Car, Trees } from "lucide-react";

const LoadScript = dynamic(
  () => import("@react-google-maps/api").then((mod) => mod.LoadScript),
  { ssr: false }
);


const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: true,
  scaleControl: true,
  streetViewControl: true,
  rotateControl: true,
  fullscreenControl: true,
  styles: [
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        { color: "#e9e9e9" },
        { lightness: 17 }
      ]
    },
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [
        { color: "#f5f5f5" },
        { lightness: 20 }
      ]
    },
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [
        { color: "#ffffff" },
        { lightness: 17 }
      ]
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        { color: "#ffffff" },
        { lightness: 29 },
        { weight: 0.2 }
      ]
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        { color: "#dedede" },
        { lightness: 21 }
      ]
    },
    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [
        { color: "#fefefe" },
        { lightness: 17 },
        { weight: 1.2 }
      ]
    }
  ]
};

const mapContainerStyle = {
  width: "100%",
  height: "600px",
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
};

const center = { lat: 4.6097, lng: -74.0817 };


const pointsOfInterest = [
  { id: 1, name: "Centro Comercial", position: { lat: 4.6120, lng: -74.0835 }, icon: <ShoppingBag size={20} /> },
  { id: 2, name: "Universidad", position: { lat: 4.6080, lng: -74.0845 }, icon: <School size={20} /> },
  { id: 3, name: "Acceso Principal", position: { lat: 4.6090, lng: -74.0800 }, icon: <Car size={20} /> },
  { id: 4, name: "Parque Recreativo", position: { lat: 4.6110, lng: -74.0805 }, icon: <Trees size={20} /> }
];

const lotMarkers = [
  { id: 1, number: "15A", position: { lat: 4.6100, lng: -74.0820 }, available: true, size: "350m²", price: "$180,000" },
  { id: 2, number: "16B", position: { lat: 4.6105, lng: -74.0825 }, available: true, size: "420m²", price: "$215,000" },
  { id: 3, number: "17C", position: { lat: 4.6110, lng: -74.0830 }, available: false, size: "380m²", price: "$195,000" },
  { id: 4, number: "18D", position: { lat: 4.6095, lng: -74.0815 }, available: true, size: "400m²", price: "$205,000" },
  { id: 5, number: "19E", position: { lat: 4.6088, lng: -74.0822 }, available: true, size: "450m²", price: "$230,000" },
];

const Map = ({ showLots = false }) => {
  const [selectedLot, setSelectedLot] = useState(null);
  const [selectedPOI, setSelectedPOI] = useState(null);
  const [activeTab, setActiveTab] = useState("location");
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // Ocultar InfoWindow cuando cambia la pestaña
  useEffect(() => {
    setSelectedLot(null);
    setSelectedPOI(null);
  }, [activeTab]);
  
  // Manejar clic en marcador de lote
  const handleLotClick = useCallback((lot) => {
    setSelectedPOI(null);
    setSelectedLot(lot);
  }, []);
  
  // Manejar clic en punto de interés
  const handlePOIClick = useCallback((poi) => {
    setSelectedLot(null);
    setSelectedPOI(poi);
  }, []);
  
  // Icono personalizado para el marcador principal
  const mainMarkerIcon = {
    path: "M 12,2 C 8.1340068,2 5,5.1340068 5,9 c 0,5.25 7,13 7,13 0,0 7,-7.75 7,-13 0,-3.8659932 -3.134007,-7 -7,-7 z",
    fillColor: "#ce6d4c",
    fillOpacity: 1,
    strokeWeight: 0,
    scale: 2,
    anchor: { x: 12, y: 24 },
  };
  
  // Iconos personalizados para lotes
  const getMarkerIcon = (available) => ({
    path: "M 12,2 C 8.1340068,2 5,5.1340068 5,9 c 0,5.25 7,13 7,13 0,0 7,-7.75 7,-13 0,-3.8659932 -3.134007,-7 -7,-7 z",
    fillColor: available ? "#4CAF50" : "#F44336",
    fillOpacity: 0.9,
    strokeWeight: 1,
    strokeColor: "#FFFFFF",
    scale: 1.5,
    anchor: { x: 12, y: 24 },
  });

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2e4052]">Ubicación Estratégica</h2>
          <p className="mt-4 text-[#6c4634] max-w-2xl mx-auto">
            Nuestro proyecto se encuentra en una zona privilegiada con excelente conectividad y rodeado de todos los servicios que necesitas.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Panel de información */}
          <div className="md:w-1/3">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Pestañas */}
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
              
              {/* Contenido de pestañas */}
              <div className="p-6">
                {activeTab === 'location' && (
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#ce6d4c]/10 flex items-center justify-center text-[#ce6d4c] mr-3">
                        <MapPin size={20} />
                      </div>
                      <h3 className="text-xl font-semibold text-[#2e4052]">Cerca de Todo</h3>
                    </div>
                    
                    <p className="text-[#6c4634] mb-6">
                      Fontana está estratégicamente ubicado, permitiéndote disfrutar de la tranquilidad de la naturaleza sin renunciar a la comodidad de la ciudad.
                    </p>
                    
                    <h4 className="font-medium text-[#2e4052] mb-2">Distancia a Puntos de Interés:</h4>
                    <ul className="space-y-3">
                      {pointsOfInterest.map((poi) => (
                        <li key={poi.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200" onClick={() => handlePOIClick(poi)}>
                          <div className="w-8 h-8 rounded-full bg-[#2e4052]/10 flex items-center justify-center text-[#2e4052]">
                            {poi.icon}
                          </div>
                          <span>{poi.name}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-8 flex items-center bg-[#2e4052]/5 p-4 rounded-lg">
                      <div className="text-[#2e4052] mr-3">
                        <Navigation size={20} />
                      </div>
                      <p className="text-sm text-[#2e4052]">
                        A solo 15 minutos del centro de la ciudad y con excelentes vías de acceso.
                      </p>
                    </div>
                  </div>
                )}
                
                {activeTab === 'lots' && showLots && (
                  <div>
                    <h3 className="text-xl font-semibold text-[#2e4052] mb-4">Lotes Disponibles</h3>
                    <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                      {lotMarkers.map((lot) => (
                        <div 
                          key={lot.id} 
                          className={`p-3 rounded-lg cursor-pointer transition-all duration-200 border ${lot.available ? 'border-green-100 bg-green-50 hover:bg-green-100' : 'border-red-100 bg-red-50 hover:bg-red-100'} ${selectedLot?.id === lot.id ? 'ring-2 ring-[#ce6d4c]' : ''}`}
                          onClick={() => handleLotClick(lot)}
                        >
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium">Lote {lot.number}</h4>
                            <span className={`text-xs px-2 py-1 rounded-full ${lot.available ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                              {lot.available ? 'Disponible' : 'Vendido'}
                            </span>
                          </div>
                          {lot.available && (
                            <div className="mt-2 text-sm grid grid-cols-2 gap-2">
                              <div>
                                <span className="text-gray-500">Área:</span> {lot.size}
                              </div>
                              <div>
                                <span className="text-gray-500">Precio:</span> {lot.price}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6">
                      <a 
                        href="/lotes" 
                        className="block w-full py-3 px-4 bg-[#ce6d4c] text-white text-center rounded-lg font-medium hover:bg-[#ce6d4c]/90 transition-colors"
                      >
                        Ver Todos los Lotes
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Mapa */}
          <div className="md:w-2/3 relative">
            <LoadScript 
              googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
              onLoad={() => setMapLoaded(true)}
            >
              <GoogleMap 
                mapContainerStyle={mapContainerStyle} 
                center={center} 
                zoom={15}
                options={mapOptions}
              >
                {/* Radio de ubicación */}
                <Circle
                  center={center}
                  radius={300}
                  options={{
                    fillColor: "#ce6d4c",
                    fillOpacity: 0.1,
                    strokeColor: "#ce6d4c",
                    strokeOpacity: 0.5,
                    strokeWeight: 1,
                  }}
                />
                
                {/* Marcador principal */}
                <Marker 
                  position={center} 
                  icon={mainMarkerIcon}
                  animation={window.google?.maps?.Animation?.DROP}
                  zIndex={1000}
                >
                  <InfoWindow>
                    <div className="text-[#2e4052] font-medium">
                      Proyecto Fontana
                    </div>
                  </InfoWindow>
                </Marker>

                {/* Puntos de interés (visibles en pestaña ubicación) */}
                {activeTab === 'location' && mapLoaded && pointsOfInterest.map((poi) => (
                  <Marker
                    key={poi.id}
                    position={poi.position}
                    onClick={() => handlePOIClick(poi)}
                    icon={{
                      url: `http://maps.google.com/mapfiles/ms/icons/blue-dot.png`,
                    }}
                    animation={window.google?.maps?.Animation?.DROP}
                  />
                ))}

                {/* Ventana de información para POI */}
                {selectedPOI && (
                  <InfoWindow
                    position={selectedPOI.position}
                    onCloseClick={() => setSelectedPOI(null)}
                  >
                    <div className="p-1">
                      <h3 className="font-medium text-[#2e4052]">{selectedPOI.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">A 5 min. del proyecto</p>
                    </div>
                  </InfoWindow>
                )}

                {/* Marcadores de lotes (visibles en pestaña lotes) */}
                {activeTab === 'lots' && showLots && mapLoaded && lotMarkers.map((lot) => (
                  <Marker
                    key={lot.id}
                    position={lot.position}
                    onClick={() => handleLotClick(lot)}
                    icon={getMarkerIcon(lot.available)}
                    animation={window.google?.maps?.Animation?.DROP}
                    zIndex={selectedLot?.id === lot.id ? 1000 : 1}
                  />
                ))}

                {/* Ventana de información para lotes */}
                {selectedLot && (
                  <InfoWindow
                    position={selectedLot.position}
                    onCloseClick={() => setSelectedLot(null)}
                  >
                    <div className="p-1">
                      <h3 className="font-medium text-[#2e4052]">Lote {selectedLot.number}</h3>
                      <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                        <div>
                          <span className="text-gray-500">Estado:</span> 
                          <span className={selectedLot.available ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                            {selectedLot.available ? ' Disponible' : ' Vendido'}
                          </span>
                        </div>
                        {selectedLot.available && (
                          <>
                            <div><span className="text-gray-500">Área:</span> {selectedLot.size}</div>
                            <div><span className="text-gray-500">Precio:</span> {selectedLot.price}</div>
                            <div className="col-span-2 mt-2">
                              <a 
                                href={`/lotes/${selectedLot.id}`} 
                                className="text-[#ce6d4c] hover:underline text-sm font-medium"
                              >
                                Ver detalles completos →
                              </a>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Map;
