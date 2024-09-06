import React from 'react';
import styled, { css } from 'styled-components';
import { useTheme } from '../../context/theme-context';

interface ButtonProps {
  variant: 'solid' | 'text';
  active?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

const StyledButton = styled.button<{ variant: 'solid' | 'text'; active?: boolean; theme: 'light' | 'dark' }>`
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: color 0.3s ease, border-bottom 0.3s ease;

  ${(props) =>
    props.variant === 'solid' &&
    css`
      background-color: ${props.theme === 'dark' ? '#333' : '#007bff'};
      color: ${props.theme === 'dark' ? '#fff' : '#fff'};
      border-radius: 4px;

      &:hover {
        background-color: ${props.theme === 'dark' ? '#555' : '#0056b3'};
      }
    `}

  ${(props) =>
    props.variant === 'text' &&
    css`
      background-color: transparent;
      color: ${props.active ? '#007bff' : (props.theme === 'dark' ? '#ccc' : '#333')};
      border-bottom: ${props.active ? `2px solid  #007bff` : 'none'};

      &:hover {
        color: ${props.theme === 'dark' ? '#ffff00' : '#007bff'};
        border-bottom: 2px solid ${props.theme === 'dark' ? '#ffff00' : '#007bff'};
      }
    `}
`;

const Button: React.FC<ButtonProps> = ({ variant, active, children, onClick }) => {
  const { theme } = useTheme(); // Access the theme from context

  return <StyledButton variant={variant} active={active} onClick={onClick} theme={theme}>{children}</StyledButton>;
};

export default Button;