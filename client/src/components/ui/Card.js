import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const variants = {
  default: css`
    background-color: ${({ theme }) => theme.colors.background.card};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    box-shadow: ${({ theme }) => theme.shadows.md};
  `,
  outlined: css`
    background-color: ${({ theme }) => theme.colors.background.card};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    border: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  `,
  elevated: css`
    background-color: ${({ theme }) => theme.colors.background.card};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    box-shadow: ${({ theme }) => theme.shadows.lg};
  `,
  flat: css`
    background-color: ${({ theme }) => theme.colors.background.card};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
  `,
};

const StyledCard = styled.div`
  padding: ${({ noPadding }) => (noPadding ? "0" : "1.5rem")};
  margin-bottom: 1.5rem;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;

  ${({ variant }) => variants[variant]}

  ${({ interactive }) =>
    interactive &&
    css`
      cursor: pointer;
      &:hover {
        transform: translateY(-4px);
        box-shadow: ${({ theme }) => theme.shadows.xl};
      }
    `}
  
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.h5.fontSize};
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const CardContent = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  gap: 0.75rem;
`;

const Card = ({
  children,
  variant = "default",
  interactive = false,
  noPadding = false,
  fullWidth = false,
  ...rest
}) => {
  return (
    <StyledCard
      variant={variant}
      interactive={interactive}
      noPadding={noPadding}
      fullWidth={fullWidth}
      {...rest}
    >
      {children}
    </StyledCard>
  );
};

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Content = CardContent;
Card.Footer = CardFooter;

Card.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["default", "outlined", "elevated", "flat"]),
  interactive: PropTypes.bool,
  noPadding: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

export default Card;
