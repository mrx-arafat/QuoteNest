import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FiAlertTriangle, FiHome } from "react-icons/fi";

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  text-align: center;
  padding: 2rem;
`;

const ErrorIcon = styled(FiAlertTriangle)`
  font-size: 5rem;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
`;

const Message = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.textSecondary};
  max-width: 600px;
`;

const HomeButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const NotFound = () => {
  return (
    <Container
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <ErrorIcon />
      <Title>404 - Page Not Found</Title>
      <Message>
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </Message>
      <HomeButton to="/">
        <FiHome />
        Back to Home
      </HomeButton>
    </Container>
  );
};

export default NotFound;
