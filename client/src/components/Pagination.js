import React from "react";
import styled from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const PageButton = styled.button`
  background-color: ${(props) => (props.active ? "#6d4ce3" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#333")};
  border: 1px solid ${(props) => (props.active ? "#6d4ce3" : "#ddd")};
  border-radius: 4px;
  padding: 0.5rem 0.8rem;
  margin: 0 0.25rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.active ? "#6d4ce3" : "#f0f0f0")};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PageInfo = styled.div`
  margin: 0 1rem;
  display: flex;
  align-items: center;
  color: #666;
  font-size: 0.9rem;
`;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Generate array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];

    // Always show first page
    pageNumbers.push(1);

    // Calculate range around current page
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    // Add ellipsis after first page if needed
    if (start > 2) {
      pageNumbers.push("...");
    }

    // Add pages in range
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    // Add ellipsis before last page if needed
    if (end < totalPages - 1) {
      pageNumbers.push("...");
    }

    // Always show last page if there is more than one page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  // Don't render pagination if only one page
  if (totalPages <= 1) {
    return null;
  }

  return (
    <PaginationContainer>
      <PageButton
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </PageButton>

      {getPageNumbers().map((page, index) =>
        page === "..." ? (
          <PageInfo key={`ellipsis-${index}`}>...</PageInfo>
        ) : (
          <PageButton
            key={page}
            active={currentPage === page}
            onClick={() => onPageChange(page)}
          >
            {page}
          </PageButton>
        )
      )}

      <PageButton
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </PageButton>
    </PaginationContainer>
  );
};

export default Pagination;
