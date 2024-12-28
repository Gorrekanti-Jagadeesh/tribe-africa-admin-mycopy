import leaflet from 'leaflet';
import { useEffect, useRef } from 'react';

const LeafletMap = ({ mark, latitude, longitude }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = leaflet.map('map').setView([latitude, longitude], 5);

      leaflet
        .tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        })
        .addTo(mapRef.current);

      leaflet
        .marker([latitude, longitude])
        .addTo(mapRef.current)
        .bindPopup(mark || 'A marker at this location.')
        .openPopup();
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [latitude, longitude, mark]);

  return (
    <div className="max-w-6xl m-auto p-2 md:p-4">
      <div
        id="map"
        style={{
          width: '100%',
          height: '400px',
        }}
      ></div>
    </div>
  );
};

export default LeafletMap;
