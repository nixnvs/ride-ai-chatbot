'use client';

import { useEffect, useState } from 'react';

export function useCurrentLocation() {
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => setLocation(position.coords),
      (err) => setError(err.message),
      { enableHighAccuracy: true },
    );
  }, []);

  return { location, error };
}
