import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Place } from '../../utils/Types';
import FilterDropdown from '../../components/filter-dropdown';
import SearchBar from '../../components/searchbar';
import { useTheme } from '../../context/theme-context';
import styled from 'styled-components';

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

const Container = styled.div`
    margin: 0 16px;
`;

const MapWrapper = styled.div<{ theme: string }>`
    position: relative;
    height: 80vh;
    width: 100%;
    background-color: ${({ theme }) => (theme === 'dark' ? '#2e2e2e' : '#ffffff')};
`;

const ControlsContainer = styled.div`
    position: absolute;
    top: 16px;
    left: 16px;
    right: 16px;
    display: flex;
    justify-content: space-between;
    z-index: 1000; /* Ensure controls are above the map */
`;

const SearchBarContainer = styled.div`
    flex: 1;
    margin-right: 8px; 
    margin-left: 40px;
`;

const FilterDropdownContainer = styled.div`
    flex: 0 0 auto; /* Prevent resizing */
`;

const MapView: React.FC<MapViewProps> = ({
    data,
    categories,
    selectedCategory,
    onSearch,
    onCategoryFilter
}) => {
    const { theme } = useTheme();

    const tileLayerUrl =
        theme === 'dark'
            ? 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
            : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    return (
        <Container>
            <MapWrapper theme={theme}>
                <ControlsContainer>
                    <SearchBarContainer>
                        <SearchBar onSearchChange={onSearch} />
                    </SearchBarContainer>
                    <FilterDropdownContainer>
                        <FilterDropdown
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onSelectCategory={onCategoryFilter}
                        />
                    </FilterDropdownContainer>
                </ControlsContainer>
                <MapContainer center={[52.5, 13.4]} zoom={5} style={{ height: '100%', width: '100%' }}>
                    <TileLayer url={tileLayerUrl} />
                    {data.map((place) => (
                        <Marker key={place.id} position={[place.coordinates.lat, place.coordinates.lon]}>
                            <Popup>{place.name}</Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </MapWrapper>
        </Container>
    );
};

export default MapView;