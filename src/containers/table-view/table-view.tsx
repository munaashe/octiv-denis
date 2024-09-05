import React from 'react';
import { Place } from '../../utils/Types';

interface TableViewProps {
    data: Place[];
    onSortChange: (column: string) => void;
    onNextPage: () => void;
    onPreviousPage: () => void;
    page: number;
    onSearchChange: (search: string) => void;
    onFilterChange: (category: string) => void;
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
    const handleSort = (column: string) => {
        onSortChange(column);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange(e.target.value);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onFilterChange(e.target.value);
    };

    return (
        <div>
            <div className="p-4 flex flex-col space-y-4">
                <input
                    type="text"
                    placeholder="Search for a place"
                    onChange={handleSearchChange}
                    className="p-2 border border-gray-300 rounded"
                />
                <select
                    onChange={handleFilterChange}
                    className="p-2 border border-gray-300 rounded"
                >
                    <option value="">All Categories</option>
                    <option value="food">Food</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="shopping">Shopping</option>
                    {/* Add more categories as needed */}
                </select>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th
                            onClick={() => handleSort('name')}
                            className="cursor-pointer p-2 text-left text-sm font-medium text-gray-500"
                        >
                            Name
                        </th>
                        <th
                            onClick={() => handleSort('category')}
                            className="cursor-pointer p-2 text-left text-sm font-medium text-gray-500"
                        >
                            Category
                        </th>
                        <th
                            onClick={() => handleSort('location')}
                            className="cursor-pointer p-2 text-left text-sm font-medium text-gray-500"
                        >
                            Location
                        </th>
                        {/* Add more columns as needed */}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((place) => (
                        <tr key={place.id}>
                            <td className="p-2 text-sm text-gray-900">{place.name}</td>
                            <td className="p-2 text-sm text-gray-900">{place.category}</td>
                            <td className="p-2 text-sm text-gray-900">{place.location}</td>
                            {/* Add more cells as needed */}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="p-4 flex justify-between items-center">
                <button
                    onClick={onPreviousPage}
                    disabled={page === 1}
                    className="p-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-sm text-gray-700">Page {page}</span>
                <button
                    onClick={onNextPage}
                    className="p-2 bg-blue-500 text-white rounded"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TableView;