import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from './components/header';
import MapView from './containers/map-view';
import TableView from './containers/table-view';
import { fetchPlaces } from './api/fetchPlaces';
import { PlacesResponse } from './utils/Types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'map' | 'table'>('map');
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<string>('asc');
  const [search, setSearch] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('');

  const { data, isLoading, isError, refetch } = useQuery<PlacesResponse>({
    queryKey: ['places', page, sortBy, sortDirection, search, filterCategory],
    queryFn: () => fetchPlaces({
      sortBy,
      sortDirection,
      search,
      filterCategory,
      page,
      limit: activeTab === 'table' ? 10 : 100, 
    }),
  });

  useEffect(() => {
    refetch();
  }, [page, sortBy, sortDirection, search, filterCategory, refetch]);

  const handleSortChange = (column: string) => {
    setSortBy(column);
    setSortDirection((prevDirection) => prevDirection === 'asc' ? 'desc' : 'asc');
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
    <div>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="p-4">
        {activeTab === 'map' ? (
          <MapView
            data={data?.data ?? []}
            onSearch={handleSearch}
            onCategoryFilter={handleCategoryFilter}
          />
        ) : (
          <TableView
            data={data?.data ?? []}
            onSortChange={handleSortChange}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
            page={page}
            onSearchChange={handleSearch}
            onFilterChange={handleCategoryFilter}
          />
        )}
      </main>
    </div>
  );
};

export default App;