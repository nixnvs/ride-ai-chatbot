'use client';

// @ts-ignore: Leaflet CSS has no type declarations
import 'leaflet/dist/leaflet.css';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix default marker icons
if (typeof window !== 'undefined' && L.Icon.Default.prototype._getIconUrl) {
  // biome-ignore lint/performance/noDelete: safe override of leaflet's internal method
  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x.src || markerIcon2x,
    iconUrl: markerIcon.src || markerIcon,
    shadowUrl: markerShadow.src || markerShadow,
  });
}

function SetViewOnLocation({ position }: { position: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 15);
    }
  }, [position, map]);
  return null;
}

export default function MobileMapsInterface() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      () => {
        setLocationError('Unable to retrieve your location.');
      },
      { enableHighAccuracy: true },
    );
  }, []);

  return (
    <div className="w-full h-full fixed inset-0 z-0">
      <MapContainer
        {...({
          center: position || [37.7749, -122.4194],
          zoom: 15,
          scrollWheelZoom: true,
          className: 'w-full h-full',
        } as any)}
      >
        <TileLayer
          {...({
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          } as any)}
        />
        {position && (
          <Marker position={position}>
            <Popup>You are here</Popup>
          </Marker>
        )}
        {position && <SetViewOnLocation position={position} />}
      </MapContainer>

      {/* Placeholder for chat overlay */}
      <div className="absolute bottom-0 left-0 w-full flex justify-center z-10 pointer-events-none">
        <div className="bg-white rounded-t-2xl shadow-lg w-full max-w-md mx-auto p-4 mb-2 pointer-events-auto">
          <button
            type="button"
            className="w-full text-gray-500 text-center py-2 rounded-full border border-gray-200 bg-gray-50"
            style={{ fontSize: '1.1rem' }}
          >
            Message Ride...
          </button>
        </div>
      </div>

      {locationError && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-100 text-red-700 px-4 py-2 rounded shadow z-20">
          {locationError}
        </div>
      )}
    </div>
  );
}
