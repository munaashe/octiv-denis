import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/theme-context';

interface SearchBarProps {
    onSearchChange: (query: string) => void;
}

const InputWrapper = styled.div<{ theme: string }>`
    position: relative;
    max-width: 400px;
    width: 100%;
`;

const Input = styled.input<{ theme: string }>`
    padding: 8px 40px 8px 8px; /* Add padding to accommodate the icon */
    font-size: 16px;
    border: 1px solid ${({ theme }) => (theme === 'dark' ? '#555' : '#ccc')};
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box; /* Ensure padding and border are included in the width */
    background-color: ${({ theme }) => (theme === 'dark' ? '#333' : '#fff')};
    color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
`;

const IconButton = styled.button<{ theme: string }>`
    position: absolute;
    right: 10px; /* Adjust positioning as needed */
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    margin: 0;
    display: flex;
    align-items: center;
    color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
`;

const SearchIcon = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M21 21L15.5 15.5M17 10.5C17 12.433 16.2711 14.2728 15.0711 15.4728C13.8711 16.6728 12.0312 17.5 10 17.5C7.96875 17.5 6.12891 16.6728 4.92891 15.4728C3.72891 14.2728 3 12.433 3 10.5C3 8.56709 3.72891 6.72723 4.92891 5.52723C6.12891 4.32723 7.96875 3.5 10 3.5C12.0312 3.5 13.8711 4.32723 15.0711 5.52723C16.2711 6.72723 17 8.56709 17 10.5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange }) => {
    const [query, setQuery] = useState<string>('');
    const { theme } = useTheme();

    const handleSearch = () => {
        onSearchChange(query);
    };

    useEffect(() => {
        if (query === '') {
            handleSearch();
        }
    }, [query]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <InputWrapper theme={theme}>
            <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search places"
                theme={theme}
            />
            <IconButton onClick={handleSearch} theme={theme}>
                <SearchIcon />
            </IconButton>
        </InputWrapper>
    );
};

export default SearchBar;