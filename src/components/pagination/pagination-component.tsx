import React from 'react';
import styled from 'styled-components';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  margin-top: 20px;
`;

const PaginationButton = styled.button<{ isActive?: boolean }>`
  background-color: ${({ isActive }) => (isActive ? '#30C2E3' : '#f0f0f0')};
  color: ${({ isActive }) => (isActive ? 'white' : 'black')};
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

const PaginationComponent: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const renderPageButtons = () => {
        const buttons = [];
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <PaginationButton
                    key={i}
                    isActive={i === currentPage}
                    onClick={() => onPageChange(i)}
                >
                    {i}
                </PaginationButton>
            );
        }
        return buttons;
    };

    return (
        <Pagination>
            <PaginationButton onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                Previous
            </PaginationButton>
            {renderPageButtons()}
            <PaginationButton onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
            </PaginationButton>
        </Pagination>
    );
};

export default PaginationComponent;