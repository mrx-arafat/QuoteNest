import React, { useState, useEffect } from "react";
import styled from "styled-components";
import QuoteCard from "../components/QuoteCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { quoteService } from "../services/api";

const PageContainer = styled.div`
  padding: 2rem 0;
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e1e1e1;
  margin-bottom: 2rem;
`;

const Tab = styled.button`
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: ${(props) => (props.active ? "600" : "400")};
  color: ${(props) => (props.active ? "#6d4ce3" : "#666")};
  border-bottom: ${(props) => (props.active ? "2px solid #6d4ce3" : "none")};
  cursor: pointer;
  margin-right: 1rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

const EmptyStateText = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 1.5rem;
`;

const AddButton = styled.button`
  background-color: #6d4ce3;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #5a3dd1;
  }
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 2rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.color || "#6d4ce3"};
  cursor: pointer;
  margin-left: 10px;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  background-color: #fdecea;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
`;

const MyQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [error, setError] = useState(null);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalQuotes, setTotalQuotes] = useState(0);

  const fetchQuotes = async (tabType = "all", page = 1) => {
    try {
      setLoading(true);
      setError(null);
      setIsSearchMode(false);

      let response;
      if (tabType === "favorites") {
        response = await quoteService.getQuotes("/favorites", page);
      } else if (tabType === "recent") {
        response = await quoteService.getQuotes("", page);
      } else {
        response = await quoteService.getQuotes("", page);
      }

      setQuotes(response.quotes);
      setCurrentPage(response.currentPage);
      setTotalPages(response.totalPages);
      setTotalQuotes(response.totalQuotes);
    } catch (error) {
      console.error("Error fetching quotes:", error);
      setError("Failed to load quotes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes(activeTab, 1);
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handlePageChange = (page) => {
    if (isSearchMode) {
      handleSearch(searchTerm, page);
    } else {
      fetchQuotes(activeTab, page);
    }
  };

  const handleSearch = async (searchTerm, page = 1) => {
    try {
      setLoading(true);
      setError(null);
      setSearchTerm(searchTerm);

      const result = await quoteService.searchQuotes(searchTerm, page);
      setQuotes(result.quotes);
      setCurrentPage(result.currentPage);
      setTotalPages(result.totalPages);
      setTotalQuotes(result.totalQuotes);
      setIsSearchMode(true);
    } catch (error) {
      console.error("Error searching quotes:", error);
      setError("Failed to search quotes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuote = async (id) => {
    if (window.confirm("Are you sure you want to delete this quote?")) {
      try {
        await quoteService.deleteQuote(id);

        // Refresh quotes based on current mode (search or tab)
        if (isSearchMode) {
          handleSearch(searchTerm, currentPage);
        } else {
          fetchQuotes(activeTab, currentPage);
        }
      } catch (error) {
        console.error("Error deleting quote:", error);
        setError("Failed to delete quote. Please try again.");
      }
    }
  };

  const handleToggleFavorite = async (id, currentStatus) => {
    try {
      await quoteService.toggleFavorite(id);

      // Refresh the current view
      if (isSearchMode) {
        handleSearch(searchTerm, currentPage);
      } else {
        fetchQuotes(activeTab, currentPage);
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
      setError("Failed to update favorite status. Please try again.");
    }
  };

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>My Quotes</PageTitle>

        <SearchBar onSearch={(term) => handleSearch(term, 1)} />

        <TabContainer>
          <Tab
            active={activeTab === "all" && !isSearchMode}
            onClick={() => handleTabChange("all")}
          >
            All
          </Tab>
          <Tab
            active={activeTab === "favorites" && !isSearchMode}
            onClick={() => handleTabChange("favorites")}
          >
            Favorites
          </Tab>
          <Tab
            active={activeTab === "recent" && !isSearchMode}
            onClick={() => handleTabChange("recent")}
          >
            Recently Added
          </Tab>
          {isSearchMode && (
            <Tab active={true} onClick={() => {}}>
              Search Results ({totalQuotes})
            </Tab>
          )}
        </TabContainer>
      </PageHeader>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {loading ? (
        <LoadingState>Loading quotes...</LoadingState>
      ) : quotes.length === 0 ? (
        <EmptyState>
          <EmptyStateText>
            {isSearchMode
              ? "No quotes found matching your search."
              : "You haven't added any quotes yet."}
          </EmptyStateText>
        </EmptyState>
      ) : (
        <>
          {quotes.map((quote) => (
            <div key={quote._id}>
              <QuoteCard
                quote={quote.quote}
                author={quote.author}
                book={quote.book}
                tags={quote.tags}
              />
              <ActionsContainer>
                <ActionButton
                  onClick={() =>
                    handleToggleFavorite(quote._id, quote.favorite)
                  }
                  color={quote.favorite ? "#e74c3c" : "#6d4ce3"}
                >
                  {quote.favorite
                    ? "Remove from Favorites"
                    : "Add to Favorites"}
                </ActionButton>
                <ActionButton
                  onClick={() => handleDeleteQuote(quote._id)}
                  color="#e74c3c"
                >
                  Delete
                </ActionButton>
              </ActionsContainer>
            </div>
          ))}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </PageContainer>
  );
};

export default MyQuotes;
