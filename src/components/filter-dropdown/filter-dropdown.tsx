import React from 'react';
import styled from 'styled-components';

interface FilterDropdownProps {
    categories: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

const Dropdown = styled.select`
  padding: 8px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin: 10px;
  text-transform: capitalize;
`;

const FilterDropdown: React.FC<FilterDropdownProps> = ({ categories = [], selectedCategory, onSelectCategory }) => {
    return (
        <Dropdown value={selectedCategory} onChange={(e) => onSelectCategory(e.target.value)}>
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