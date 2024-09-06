import React from 'react';
import styled from 'styled-components';
import { Place } from '../../utils/Types';
import FilterDropdown from '../../components/filter-dropdown';
import SearchBar from '../../components/searchbar';

// Styled Components
const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #ccc;
`;

const TableHead = styled.th`
    border: 1px solid #ccc;
    padding: 12px;
    text-align: left;
    cursor: pointer;
    background-color: #f9f9f9;
`;

const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #f2f2f2;
    }
`;

const TableData = styled.td`
    border: 1px solid #ccc;
    padding: 12px;
`;

const Pagination = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    margin-top: 20px;
`;

const PaginationButton = styled.button`
    background-color: #f0f0f0;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:disabled {
        background-color: #e0e0e0;
        cursor: not-allowed;
    }
`;

// TableView Component
interface TableViewProps {
    data: Place[];
    categories: string[];
    selectedCategory: string;
    onSortChange: (column: string) => void;
    onNextPage: () => void;
    onPreviousPage: () => void;
    page: number;
    onSearchChange: (search: string) => void;
    onFilterChange: (filter: string) => void;
}

const TableView: React.FC<TableViewProps> = ({
    data,
    categories,
    selectedCategory,
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
                <SearchBar onSearchChange={onSearchChange} />
                <FilterDropdown
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={onFilterChange}
                />
            </div>

            <Table>
                <thead>
                    <tr>
                        <TableHead onClick={() => onSortChange('name')}>Name</TableHead>
                        <TableHead onClick={() => onSortChange('category')}>Category</TableHead>
                        <TableHead onClick={() => onSortChange('description')}>Description</TableHead>
                        <TableHead onClick={() => onSortChange('address')}>Address</TableHead>
                    </tr>
                </thead>
                <tbody>
                    {data.map((place) => (
                        <TableRow key={place.id}>
                            <TableData>{place.name}</TableData>
                            <TableData>{place.category}</TableData>
                            <TableData>{place.description}</TableData>
                            <TableData>{place.address}</TableData>
                        </TableRow>
                    ))}
                </tbody>
            </Table>

            <Pagination>
                <PaginationButton onClick={onPreviousPage} disabled={page === 1}>
                    Previous
                </PaginationButton>
                <span>Page {page}</span>
                <PaginationButton onClick={onNextPage}>Next</PaginationButton>
            </Pagination>
        </div>
    );
};

export default TableView;