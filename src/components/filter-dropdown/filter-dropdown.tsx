import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/theme-context';

interface FilterDropdownProps {
    categories: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

const Dropdown = styled.select<{ theme: string }>`
  padding: 8px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => (theme === 'dark' ? '#555' : '#ccc')};
  background-color: ${({ theme }) => (theme === 'dark' ? '#333' : '#fff')};
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  margin: 10px;
  text-transform: capitalize;
`;

const FilterDropdown: React.FC<FilterDropdownProps> = ({ categories = [], selectedCategory, onSelectCategory }) => {
    const { theme } = useTheme();

    return (
        <Dropdown value={selectedCategory} onChange={(e) => onSelectCategory(e.target.value)} theme={theme}>
            <option value="">All Categories</option>
            {categories.map((category, index) => (
                <option key={index} value={category}>
                    {category}
                </option>
            ))}
        </Dropdown>
    );
};

export default FilterDropdown;