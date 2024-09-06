import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import Header from './components/header';
import MapView from './containers/map-view';
import TableView from './containers/table-view';
import { fetchCategories, fetchPlaces } from './api/fetchPlaces';
import { PlacesResponse } from './utils/Types';
import { useTheme } from './context/theme-context';

const Main = styled.main`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'map' | 'table'>('map');
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<string>('asc');
  const [search, setSearch] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('');

  const { theme, toggleTheme } = useTheme();

  const { data, isLoading: isPlacesLoading, isError, refetch } = useQuery<PlacesResponse>({
    queryKey: ['places', page, sortBy, sortDirection, search, filterCategory],
    queryFn: () =>
      fetchPlaces({
        sortBy,
        sortDirection,
        search,
        filterCategory,
        page,
        limit: activeTab === 'table' ? 10 : 100,
      }),
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  useEffect(() => {
    refetch();
  }, [page, sortBy, sortDirection, search, filterCategory, activeTab, refetch]);

  const handleSortChange = (column: string) => {
    setSortBy(column);
    setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
  };

  const handleSearch = (search: string) => {
    setSearch(search);
  };

  const handleCategoryFilter = (filterValue: string) => {
    setFilterCategory(filterValue);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <Main>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'map' &&
        <MapView
          data={data?.data ?? []}
          categories={categories!}
          selectedCategory={filterCategory}
          onSearch={handleSearch}
          onCategoryFilter={handleCategoryFilter}
        />
      }
      {activeTab === 'table' &&
        <TableView
          data={data?.data ?? []}
          categories={categories!}
          selectedCategory={filterCategory}
          isLoading={isPlacesLoading}
          onSortChange={handleSortChange}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
          page={page}
          onSearchChange={handleSearch}
          onFilterChange={handleCategoryFilter}
        />
      }
    </Main>
  );
};

export default App;