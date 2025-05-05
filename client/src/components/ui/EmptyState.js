import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
`;

const Illustration = styled(motion.div)`
  width: 180px;
  height: 180px;
  margin-bottom: 2rem;
  opacity: 0.8;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
`;

const Description = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 2rem;
  max-width: 500px;
`;

const ActionButton = styled(motion(Link))`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  transition: ${({ theme }) => theme.transition};

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

// SVG for empty quotes illustration
const EmptyQuoteIllustration = () => (
  <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M362.5 112h-213c-8.3 0-15 6.7-15 15v143c0 8.3 6.7 15 15 15h20.7l20 40c2.6 5.3 9.9 5.3 12.5 0l20-40h139.7c8.3 0 15-6.7 15-15V127c.1-8.3-6.6-15-14.9-15z"
      fill="#f0f0ff"
      stroke="currentColor"
      strokeWidth="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M152.5 180h207M152.5 220h160"
      stroke="currentColor"
      strokeWidth="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="256"
      cy="256"
      r="200"
      stroke="currentColor"
      strokeWidth="8"
      strokeDasharray="15 15"
      opacity="0.4"
    />
  </svg>
);

const EmptyState = ({
  title = "No quotes found",
  description = "You haven't added any quotes yet. Start adding your favorite quotes now!",
  actionText = "Add Your First Quote",
  actionLink = "/add-quote",
}) => {
  return (
    <Container
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Illustration
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <EmptyQuoteIllustration />
      </Illustration>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <ActionButton
        to={actionLink}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FiPlusCircle size={18} />
        {actionText}
      </ActionButton>
    </Container>
  );
};

export default EmptyState;
