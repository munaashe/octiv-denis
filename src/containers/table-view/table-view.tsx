import React from 'react';
import { Place } from '../../utils/Types';

interface TableViewProps {
    data: Place[];
    onSortChange: (column: string) => void;
    onNextPage: () => void;
    onPreviousPage: () => void;
    page: number;
    onSearchChange: (search: string) => void;
    onFilterChange: (filter: string) => void;
}

const TableView: React.FC<TableViewProps> = ({
    data,
    onSortChange,
    onNextPage,
    onPreviousPage,
    page,
    onSearchChange,
    onFilterChange
}) => {
    return (
        <div>
            <div className="flex mb-4">
                <input
                    type="text"
                    placeholder="Search places..."
                    className="border p-2 mr-2"
                    onChange={(e) => onSearchChange(e.target.value)}
                />
                <select
                    className="border p-2"
                    onChange={(e) => onFilterChange(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="category1">Category 1</option>
                    <option value="category2">Category 2</option>
                </select>
            </div>

            <table className="table-auto w-full border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th onClick={() => onSortChange('name')} className="border p-2 cursor-pointer">Name</th>
                        <th onClick={() => onSortChange('category')} className="border p-2 cursor-pointer">Category</th>
                        <th onClick={() => onSortChange('location')} className="border p-2 cursor-pointer">Location</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((place) => (
                        <tr key={place.id}>
                            <td className="border p-2">{place.name}</td>
                            <td className="border p-2">{place.category}</td>
                            <td className="border p-2">{place.coordinates.lat}, {place.coordinates.lon}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-between mt-4">
                <button onClick={onPreviousPage} disabled={page === 1} className="bg-gray-200 p-2">Previous</button>
                <button onClick={onNextPage} className="bg-gray-200 p-2">Next</button>
            </div>
        </div>
    );
};

export default TableView;