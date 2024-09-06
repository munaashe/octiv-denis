import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Place } from '../../utils/Types';
import FilterDropdown from '../../components/filter-dropdown';
import SearchBar from '../../components/searchbar';

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
    categories: string[];
    selectedCategory: string;
    onSearch: (search: string) => void;
    onCategoryFilter: (filter: string) => void;
}

const MapView: React.FC<MapViewProps> = ({
    data,
    categories,
    selectedCategory,
    onSearch,
    onCategoryFilter }) => {
    return (
        <div>
            <div className="flex mb-4">
                <SearchBar onSearchChange={onSearch} />
                <FilterDropdown
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={onCategoryFilter}
                />
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