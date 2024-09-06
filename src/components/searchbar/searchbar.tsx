import React from 'react';
import styled from 'styled-components';

interface SearchBarProps {
    onSearchChange: (query: string) => void;
}

const Input = styled.input`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  max-width: 400px;
  margin: 10px 0;
`;

const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange }) => {
    return (
        <Input
            type="text"
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search places"
        />
    );
};

export default SearchBar;