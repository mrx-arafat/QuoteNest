import React from "react";
import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
`;

const SkeletonContainer = styled.div`
  background-color: ${({ theme }) => theme.surface};
  border-radius: 12px;
  padding: 1.8rem;
  margin-bottom: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadow};
  animation: ${pulse} 1.5s ease-in-out infinite;

  @media (max-width: 768px) {
    padding: 1.2rem;
  }
`;

const SkeletonQuote = styled.div`
  height: 20px;
  background-color: ${({ theme }) => `${theme.border}80`};
  margin-bottom: 10px;
  border-radius: 4px;
  width: ${({ width }) => width || "100%"};
`;

const SkeletonAuthor = styled.div`
  height: 16px;
  width: 40%;
  background-color: ${({ theme }) => `${theme.border}80`};
  margin-bottom: 8px;
  margin-top: 20px;
  border-radius: 4px;
`;

const SkeletonBook = styled.div`
  height: 16px;
  width: 60%;
  background-color: ${({ theme }) => `${theme.border}80`};
  margin-bottom: 16px;
  border-radius: 4px;
`;

const SkeletonTagsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

const SkeletonTag = styled.div`
  height: 22px;
  width: ${({ width }) => width || "60px"};
  background-color: ${({ theme }) => `${theme.border}80`};
  border-radius: 20px;
`;

const QuoteSkeleton = () => {
  return (
    <SkeletonContainer>
      <SkeletonQuote />
      <SkeletonQuote width="95%" />
      <SkeletonQuote width="90%" />
      <SkeletonQuote width="60%" />

      <SkeletonAuthor />
      <SkeletonBook />

      <SkeletonTagsContainer>
        <SkeletonTag />
        <SkeletonTag width="80px" />
        <SkeletonTag width="50px" />
      </SkeletonTagsContainer>
    </SkeletonContainer>
  );
};

const QuotesLoading = ({ count = 3 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <QuoteSkeleton key={index} />
      ))}
    </>
  );
};

export default QuotesLoading;
