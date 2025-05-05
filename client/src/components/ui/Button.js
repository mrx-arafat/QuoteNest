import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const variants = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.primary.contrast};
    &:hover {
      background-color: ${({ theme }) => theme.colors.primary.dark};
    }
    &:focus-visible {
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary.light};
    }
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.colors.secondary.main};
    color: ${({ theme }) => theme.colors.secondary.contrast};
    &:hover {
      background-color: ${({ theme }) => theme.colors.secondary.dark};
    }
    &:focus-visible {
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.secondary.light};
    }
  `,
  outline: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary.main};
    border: 1px solid ${({ theme }) => theme.colors.primary.main};
    &:hover {
      background-color: ${({ theme }) => theme.colors.neutral[50]};
    }
    &:focus-visible {
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary.light};
    }
  `,
  text: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary.main};
    &:hover {
      background-color: ${({ theme }) => theme.colors.neutral[50]};
    }
    &:focus-visible {
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary.light};
    }
  `,
  error: css`
    background-color: ${({ theme }) => theme.colors.error};
    color: white;
    &:hover {
      background-color: ${({ theme }) => theme.colors.error}e6;
    }
    &:focus-visible {
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.error}66;
    }
  `,
};

const sizes = {
  small: css`
    font-size: 0.75rem;
    padding: 0.5rem 1rem;
    border-radius: ${({ theme }) => theme.borderRadius.md};
  `,
  medium: css`
    font-size: 0.875rem;
    padding: 0.625rem 1.25rem;
    border-radius: ${({ theme }) => theme.borderRadius.md};
  `,
  large: css`
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
  `,
};

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: ${({ theme }) => theme.typography.fontWeightMedium};
  letter-spacing: 0.01em;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      transform: none;
    }
  }

  ${({ variant }) => variants[variant]}
  ${({ size }) => sizes[size]}
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}
  
  ${({ withIcon }) =>
    withIcon &&
    css`
      svg {
        font-size: 1.25em;
      }
    `}
  
  /* Ripple effect */
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    background-image: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.4) 10%,
      transparent 10.01%
    );
    background-repeat: no-repeat;
    background-position: 50%;
    transform: scale(10, 10);
    opacity: 0;
    transition: transform 0.5s, opacity 1s;
  }

  &:active::after {
    transform: scale(0, 0);
    opacity: 0.4;
    transition: 0s;
  }
`;

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  withIcon = false,
  ...rest
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      withIcon={withIcon}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "outline",
    "text",
    "error",
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  fullWidth: PropTypes.bool,
  withIcon: PropTypes.bool,
};

export default Button;
