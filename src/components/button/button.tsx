import React from 'react';
import styled, { css } from 'styled-components';
import { useTheme } from '../../context/theme-context';

interface ButtonProps {
  variant: 'solid' | 'text';
  active?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
}

const StyledButton = styled.button<{ variant: 'solid' | 'text'; active?: boolean; theme: 'light' | 'dark'; disabled: boolean }>`
  padding: 10px 20px;
  border: none;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')}; // Disable cursor when disabled
  font-size: 16px;
  transition: color 0.3s ease, border-bottom 0.3s ease;

  ${(props) =>
    props.variant === 'solid' &&
    css`
      background-color: ${props.disabled
        ? props.theme === 'dark'
          ? '#555'
          : '#ccc'
        : props.theme === 'dark'
          ? '#333'
          : '#007bff'};
      color: ${props.disabled ? '#999' : '#fff'};
      border-radius: 4px;

      &:hover {
        background-color: ${props.disabled
        ? props.theme === 'dark'
          ? '#555'
          : '#ccc'
        : props.theme === 'dark'
          ? '#555'
          : '#0056b3'};
      }
    `}

  ${(props) =>
    props.variant === 'text' &&
    css`
      background-color: transparent;
      color: ${props.disabled
        ? '#999'
        : props.active
          ? '#007bff'
          : props.theme === 'dark'
            ? '#ccc'
            : '#333'};
      border-bottom: ${props.disabled
        ? 'none'
        : props.active
          ? `2px solid #007bff`
          : 'none'};

      &:hover {
        color: ${props.disabled
        ? '#999'
        : props.theme === 'dark'
          ? '#ffff00'
          : '#007bff'};
        border-bottom: ${props.disabled
        ? 'none'
        : `2px solid ${props.theme === 'dark' ? '#ffff00' : '#007bff'}`};
      }
    `}
`;

const Button: React.FC<ButtonProps> = ({ variant, active, children, disabled = false, onClick }) => {
  const { theme } = useTheme();

  return (
    <StyledButton
      variant={variant}
      active={active}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      theme={theme}
    >
      {children}
    </StyledButton>
  );
};

export default Button;