import React, { useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Place } from '../../utils/Types';
import FilterDropdown from '../../components/filter-dropdown';
import SearchBar from '../../components/searchbar';
import Button from '../../components/button';
import { useTheme } from '../../context/theme-context';

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
    isLoading: boolean;
}

const defaultTheme = {
    tableBorder: '#ccc',
    tableHeadBackground: '#f5f5f5',
    tableRowEvenBackground: '#fafafa',
    color: '#333',
    skeleton: '#e0e0e0',
    paginationBackground: '#ffffff', // Add default value for paginationBackground
};

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    border: 1px solid ${({ theme }) => theme.tableBorder || defaultTheme.tableBorder};
`;

const TableHead = styled.th`
    border: 1px solid ${({ theme }) => theme.tableBorder || defaultTheme.tableBorder};
    padding: 12px;
    text-align: left;
    cursor: pointer;
    background-color: ${({ theme }) => theme.tableHeadBackground || defaultTheme.tableHeadBackground};
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.tableRowEvenBackground || defaultTheme.tableRowEvenBackground};
  }
`;

const TableData = styled.td`
    border: 1px solid ${({ theme }) => theme.tableBorder || defaultTheme.tableBorder};
    padding: 12px;
    color: ${({ theme }) => theme.color || defaultTheme.color};
`;

const pulse = keyframes`
    0% {
        background-position: -200% 0;
    }
    100% {
        background-position: 200% 0;
    }
`;

const SkeletonRow = styled.tr`
    background: ${({ theme }) => theme.skeleton || defaultTheme.skeleton};
    background: linear-gradient(90deg, #e0e0e0 25%, #f4f4f4 50%, #e0e0e0 75%);
    background-size: 200% 100%;
    animation: ${pulse} 1.5s infinite ease-in-out;
    height: 50px;
`;

const SkeletonCell = styled.td`
    height: 24px;
    border: 1px solid ${({ theme }) => theme.tableBorder || defaultTheme.tableBorder};
    background: ${({ theme }) => theme.skeleton || defaultTheme.skeleton};
    background: linear-gradient(90deg, #e0e0e0 25%, #f4f4f4 50%, #e0e0e0 75%);
    background-size: 200% 100%;
    border-radius: 4px;
    margin: 4px 0;
    animation: ${pulse} 1.5s infinite ease-in-out;
`;

const Pagination = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 16px;
    margin-top: 20px;
    color: ${({ theme }) => theme.color || defaultTheme.color};
    background-color: ${({ theme }) => theme.paginationBackground || defaultTheme.paginationBackground}; // Ensure this is defined
`;

const ControlsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 16px;
    align-items: center;
    gap: 16px; 
    margin-bottom: 16px; 
`;

const TableView: React.FC<TableViewProps> = ({
    data,
    categories,
    selectedCategory,
    onSortChange,
    onNextPage,
    onPreviousPage,
    page,
    onSearchChange,
    onFilterChange,
    isLoading
}) => {
    const { theme } = useTheme();
    const [totalPages, setTotalPages] = useState<number>(1)

    useEffect(() => {
        if (data) {
            setTotalPages(data.length);
        }
    }, [data])

    return (
        <div>
            <ControlsContainer>
                <SearchBar onSearchChange={onSearchChange} />
                <FilterDropdown
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={onFilterChange}
                />
            </ControlsContainer>

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
                    {isLoading
                        ? Array.from({ length: 10 }).map((_, index) => (
                            <SkeletonRow key={index}>
                                <SkeletonCell />
                                <SkeletonCell />
                                <SkeletonCell />
                                <SkeletonCell />
                            </SkeletonRow>
                        ))
                        : data.map((place) => (
                            <TableRow key={place.id}>
                                <TableData>{place.name}</TableData>
                                <TableData>{place.category}</TableData>
                                <TableData>{place.description}</TableData>
                                <TableData>{place.address}</TableData>
                            </TableRow>
                        ))
                    }
                </tbody>
            </Table>

            <Pagination>
                <Button variant='solid' onClick={onPreviousPage} active={page !== 1}>
                    Previous
                </Button>
                <span>Page {page}</span>
                <Button onClick={onNextPage} variant='solid' disabled={page >= totalPages} >
                    Next
                </Button>
            </Pagination>
        </div>
    );
};

export default TableView;