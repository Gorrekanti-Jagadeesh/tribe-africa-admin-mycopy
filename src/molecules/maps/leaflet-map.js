import { jsx as _jsx } from 'react/jsx-runtime';
import leaflet from 'leaflet';
import { useEffect, useRef, useState } from 'react';
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
  return _jsx('div', {
    id: 'map',
    style: {
      width: '100%',
      height: '400px',
      zIndex: 1,
    },
  });
};
export const GetCoordinateOnMap = ({ setCoordinates }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(5);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = leaflet.map('map').setView([lat || 32.238723, lng || 29.923846827], zoomLevel);
      leaflet
        .tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        })
        .addTo(mapRef.current);
      mapRef.current.on('click', (e) => {
        setLat(e.latlng.lat);
        setLng(e.latlng.lng);
        setCoordinates({
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
        });
      });
      mapRef.current.on('zoomend', () => {
        const currentZoom = mapRef.current.getZoom();
        setZoomLevel(currentZoom);
      });
    }
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);
  useEffect(() => {
    mapRef.current.setView([lat || 32.238723, lng || 29.923846827], zoomLevel);
    if (markerRef.current) markerRef.current.remove();
    if (lat && lng) markerRef.current = leaflet.marker([lat, lng]).addTo(mapRef.current);
  }, [lat, lng]);
  return _jsx('div', {
    id: 'map',
    style: {
      width: '100%',
      height: '400px',
    },
  });
};
export default LeafletMap;
