import React, { useState } from 'react';
import { Place } from '../../utils/Types';

interface MapViewProps {
    data: Place[];
    onSearchChange: (search: string) => void;
    onFilterChange: (category: string) => void;
}

const MapView: React.FC<MapViewProps> = ({ data, onSearchChange, onFilterChange }) => {
    const [search, setSearch] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        onSearchChange(e.target.value);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const category = e.target.value;
        setSelectedCategory(category);
        onFilterChange(category);
    };

    return (
        <div>
            <div className="p-4 flex flex-col space-y-4">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Search for a place"
                    className="p-2 border border-gray-300 rounded"
                />
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="p-2 border border-gray-300 rounded"
                >
                    <option value="">All Categories</option>
                    <option value="food">Food</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="shopping">Shopping</option>
                    {/* Add more categories as needed */}
                </select>
            </div>
            <div className="map-container">
                {/* Render map and place markers based on data */}
                {/* You can use libraries like react-leaflet or google-maps-react */}
            </div>
        </div>
    );
};

export default MapView;