import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Place } from '../../utils/Types';

const DefaultIcon = L.icon({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapViewProps {
    data: Place[];
    onSearch: (search: string) => void;
    onCategoryFilter: (filter: string) => void;
}

const MapView: React.FC<MapViewProps> = ({ data, onSearch, onCategoryFilter }) => {
    return (
        <div>
            <div className="flex mb-4">
                <input
                    type="text"
                    placeholder="Search places..."
                    className="border p-2 mr-2"
                    onChange={(e) => onSearch(e.target.value)}
                />
                <select
                    className="border p-2"
                    onChange={(e) => onCategoryFilter(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="category1">Category 1</option>
                    <option value="category2">Category 2</option>
                    {/* Add more categories as needed */}
                </select>
            </div>
            <MapContainer center={[52.5, 13.4]} zoom={5} style={{ height: '80vh', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {data.map((place) => (
                    <Marker key={place.id} position={[place.coordinates.lat, place.coordinates.lon]}>
                        <Popup>{place.name}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapView;