import React, { forwardRef } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const sizes = {
  small: css`
    font-size: 0.875rem;
    padding: 0.5rem 0.75rem;
    border-radius: ${({ theme }) => theme.borderRadius.md};
  `,
  medium: css`
    font-size: 1rem;
    padding: 0.625rem 0.875rem;
    border-radius: ${({ theme }) => theme.borderRadius.md};
  `,
  large: css`
    font-size: 1.125rem;
    padding: 0.75rem 1rem;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
  `,
};

const IconWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  top: 0;
  bottom: 0;
  color: ${({ theme }) => theme.colors.neutral[500]};
  ${({ position }) =>
    position === "left"
      ? css`
          left: 0;
        `
      : css`
          right: 0;
        `}
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  background-color: white;
  border: 1px solid
    ${({ theme, error }) =>
      error ? theme.colors.error : theme.colors.neutral[300]};
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeightRegular};
  outline: none;
  transition: all 0.2s ease-in-out;

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral[400]};
  }

  &:focus {
    border-color: ${({ theme, error }) =>
      error ? theme.colors.error : theme.colors.primary.main};
    box-shadow: 0 0 0 3px
      ${({ theme, error }) =>
        error ? `${theme.colors.error}33` : `${theme.colors.primary.main}33`};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.neutral[100]};
    opacity: 0.7;
    cursor: not-allowed;
  }

  ${({ size }) => sizes[size]}

  ${({ startIcon }) =>
    startIcon &&
    css`
      padding-left: 2.5rem;
    `}
  
  ${({ endIcon }) =>
    endIcon &&
    css`
      padding-right: 2.5rem;
    `}
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: ${({ theme }) => theme.typography.fontWeightMedium};
  color: ${({ theme, error }) =>
    error ? theme.colors.error : theme.colors.text.primary};
`;

const ErrorMessage = styled.div`
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.error};
`;

const HelperText = styled.div`
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Input = forwardRef(
  (
    {
      id,
      name,
      label,
      size = "medium",
      error = false,
      errorMessage = "",
      helperText = "",
      startIcon = null,
      endIcon = null,
      fullWidth = true,
      ...rest
    },
    ref
  ) => {
    return (
      <div style={{ width: fullWidth ? "100%" : "auto", marginBottom: "1rem" }}>
        {label && (
          <Label htmlFor={id} error={error}>
            {label}
          </Label>
        )}
        <InputWrapper>
          <StyledInput
            id={id}
            name={name}
            ref={ref}
            size={size}
            error={error}
            startIcon={startIcon}
            endIcon={endIcon}
            {...rest}
          />
          {startIcon && <IconWrapper position="left">{startIcon}</IconWrapper>}
          {endIcon && <IconWrapper position="right">{endIcon}</IconWrapper>}
        </InputWrapper>
        {error && errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        {helperText && !error && <HelperText>{helperText}</HelperText>}
      </div>
    );
  }
);

Input.displayName = "Input";

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  helperText: PropTypes.string,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  fullWidth: PropTypes.bool,
};

export default Input;
