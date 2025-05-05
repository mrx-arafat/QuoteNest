import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const StyledButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: ${({ size }) =>
    size === "small"
      ? "0.5rem 1rem"
      : size === "large"
      ? "1rem 2rem"
      : "0.8rem 1.5rem"};
  font-size: ${({ size }) =>
    size === "small" ? "0.875rem" : size === "large" ? "1.125rem" : "1rem"};
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};
  position: relative;
  overflow: hidden;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};

  /* Variants */
  background-color: ${({ theme, variant }) =>
    variant === "outlined" || variant === "text"
      ? "transparent"
      : variant === "secondary"
      ? theme.background
      : variant === "success"
      ? theme.success
      : variant === "warning"
      ? theme.warning
      : variant === "error"
      ? theme.error
      : theme.primary};

  color: ${({ theme, variant }) =>
    variant === "outlined" || variant === "text"
      ? theme.primary
      : variant === "secondary"
      ? theme.text
      : "white"};

  border: ${({ theme, variant }) =>
    variant === "outlined"
      ? `1px solid ${theme.primary}`
      : variant === "text"
      ? "none"
      : "none"};

  /* Hover effects */
  &:hover:not(:disabled) {
    background-color: ${({ theme, variant }) =>
      variant === "outlined"
        ? `${theme.primary}15`
        : variant === "text"
        ? `${theme.primary}10`
        : variant === "secondary"
        ? `${theme.border}`
        : variant === "success"
        ? `${theme.success}E0`
        : variant === "warning"
        ? `${theme.warning}E0`
        : variant === "error"
        ? `${theme.error}E0`
        : theme.secondary};
    transform: translateY(-2px);
    box-shadow: ${({ theme, variant }) =>
      variant === "outlined" || variant === "text"
        ? "none"
        : `0 4px 12px ${theme.primary}30`};
  }

  /* Active/pressed effects */
  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: none;
  }

  /* Disabled state */
  &:disabled {
    background-color: ${({ theme, variant }) =>
      variant === "outlined" || variant === "text"
        ? "transparent"
        : theme.border};
    color: ${({ theme }) => theme.textSecondary};
    border-color: ${({ theme, variant }) =>
      variant === "outlined" ? theme.border : "transparent"};
    cursor: not-allowed;
    opacity: 0.7;
  }

  /* Ripple effect */
  .ripple {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.4);
    transform: scale(0);
    animation: ripple 0.6s linear;
  }

  @keyframes ripple {
    to {
      transform: scale(2.5);
      opacity: 0;
    }
  }
`;

const Loading = styled.span`
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Button = ({
  children,
  variant = "primary", // primary, secondary, outlined, text, success, warning, error
  size = "medium", // small, medium, large
  fullWidth = false,
  loading = false,
  disabled = false,
  onClick,
  ...props
}) => {
  const handleClick = (e) => {
    if (loading || disabled) return;

    // Add ripple effect
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

    e.currentTarget.appendChild(ripple);

    // Remove ripple after animation completes
    setTimeout(() => {
      ripple.remove();
    }, 600);

    if (onClick) onClick(e);
  };

  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      onClick={handleClick}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      {...props}
    >
      {loading ? <Loading /> : children}
    </StyledButton>
  );
};

export default Button;
